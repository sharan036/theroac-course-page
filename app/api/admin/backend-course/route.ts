import { NextRequest, NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/course-auth";
import {
  backendDetailConfigured,
  backendUpdateConfigured,
  getBackendAdminCourse,
  writeBackendCourse,
} from "@/lib/backend-course-api";
import { validateCourseUpdate } from "@/lib/backend-course-types";

export const dynamic = "force-dynamic";

/**
 * Uses the same auth_token cookie as TheROAC frontend login. The token
 * remains server-side. The backend itself enforces instructor/admin access.
 * Optional server-only credential is for deployments on an unrelated
 * domain where the .theroac.com cookie cannot be received.
 */
function backendToken(req: NextRequest) {
  return req.cookies.get("auth_token")?.value ||
    process.env.ROAC_BACKEND_ADMIN_TOKEN || "";
}
function responseError(message: string, status: number) {
  return NextResponse.json({ error: message }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return responseError("Unauthorized", 401);
  if (!backendDetailConfigured()) return NextResponse.json({
    configured: false,
    writable: false,
    message: "Backend mode is disabled. Set ROAC_COURSE_BACKEND_ENABLED=true after creating the Course record.",
  }, { headers: { "Cache-Control": "no-store" } });
  const slug = req.nextUrl.searchParams.get("slug") || "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 65)
    return responseError("Invalid course slug", 400);
  const token = backendToken(req);
  if (!token) return responseError(
    "Sign in to your TheROAC instructor/admin account to view backend Course fields.", 401);
  try {
    const result = await getBackendAdminCourse(slug, token);
    if (!result) return responseError(
      "Course not found in your instructor/admin dashboard, or your account lacks access.", 404);
    return NextResponse.json({
      configured: true,
      writable: backendUpdateConfigured(token),
      ...result,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return responseError("Unable to reach TheROAC backend dashboard.", 502);
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return responseError("Unauthorized", 401);
  if (!sameOrigin(req)) return responseError("Invalid request origin", 403);
  const token = backendToken(req);
  if (!backendUpdateConfigured(token))
    return responseError("Sign in with an authorized TheROAC account and enable the course backend.", 503);
  if (Number(req.headers.get("content-length") || "0") > 32000)
    return responseError("Payload too large", 413);
  let body: unknown;
  try { body = await req.json(); } catch { return responseError("Invalid JSON", 400); }
  if (!body || typeof body !== "object") return responseError("Expected JSON object", 400);
  const { id, slug, update } = body as Record<string, unknown>;
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id) ||
      typeof slug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !validateCourseUpdate(update))
    return responseError("Invalid course update", 400);

  try {
    const existing = await getBackendAdminCourse(slug, token);
    if (!existing || existing.course.id !== id)
      return responseError("Course ID or access has changed. Reload the editor.", 409);

    // Existing Course.updateCourse regenerates the slug when title changes.
    // Prevent breaking the published landing-page URL and presentation CMS mapping.
    if (update.title !== existing.course.title)
      return responseError("TheROAC changes the slug when a course title changes. Rename the course through the main dashboard and update its landing page slug together.", 409);

    const result = await writeBackendCourse(id, token, update);
    if (!result.ok)
      return responseError("TheROAC rejected this update (HTTP " + result.status + "). Check instructor/admin permissions.", result.status === 401 || result.status === 403 ? result.status : 502);
    return NextResponse.json({ ok: true, slug: result.course?.slug || slug }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return responseError("Unable to write to TheROAC course backend.", 502);
  }
}
