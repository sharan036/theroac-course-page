import { NextRequest, NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/course-auth";
import { backendDetailConfigured, backendUpdateConfigured, getBackendCourse, updateEndpoint } from "@/lib/backend-course-api";
import { validateCourseUpdate, type BackendCourseUpdate } from "@/lib/backend-course-types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({error:"Unauthorized"},{status:401});
  if (!backendDetailConfigured()) return NextResponse.json({
    configured: false,
    writable: false,
    message: "Set ROAC_COURSE_DETAIL_PATH to the actual GET route of your backend.",
  },{headers:{"Cache-Control":"no-store"}});
  const slug = req.nextUrl.searchParams.get("slug") || "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length>65) return NextResponse.json({error:"Invalid slug"},{status:400});
  try {
    const record = await getBackendCourse(slug,process.env.ROAC_BACKEND_ADMIN_TOKEN);
    if (!record) return NextResponse.json({error:"Course was not found in the existing backend."},{status:404});
    return NextResponse.json({ configured:true, writable:backendUpdateConfigured(), ...record },{headers:{"Cache-Control":"no-store"}});
  } catch {
    return NextResponse.json({error:"Unable to read the configured backend course endpoint."},{status:502});
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({error:"Unauthorized"},{status:401});
  if (!sameOrigin(req)) return NextResponse.json({error:"Invalid request origin"},{status:403});
  if (!backendUpdateConfigured()) return NextResponse.json({
    error:"Backend updating is not configured. Supply the actual course update route and a server-side admin credential.",
  },{status:503});
  if (Number(req.headers.get("content-length") || "0") > 32000) return NextResponse.json({error:"Payload too large"},{status:413});
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({error:"Invalid JSON"},{status:400}); }
  if (!body || typeof body !== "object") return NextResponse.json({error:"Expected JSON object"},{status:400});
  const { id, slug, update } = body as {id?:unknown;slug?:unknown;update?:unknown};
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)
    || typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
    || !validateCourseUpdate(update)) return NextResponse.json({error:"Invalid course update"},{status:400});
  const token = process.env.ROAC_BACKEND_ADMIN_TOKEN;
  try {
    // Check the record ID matches the requested slug so a client cannot retarget another course.
    const record = await getBackendCourse(slug,token);
    if (!record || record.course.id !== id) return NextResponse.json({error:"Course ID does not match slug"},{status:409});
    const method = process.env.ROAC_COURSE_UPDATE_METHOD === "PUT" ? "PUT" : "PATCH";
    const response = await fetch(updateEndpoint(id), {
      method,
      headers: {
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
        Accept:"application/json",
      },
      body: JSON.stringify(update satisfies BackendCourseUpdate),
      cache:"no-store",
      signal:AbortSignal.timeout(12000),
    });
    if (!response.ok) return NextResponse.json({error:`Backend rejected the update (HTTP ${response.status}). Check route/method/permissions.`},{status:502});
    return NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
  } catch {
    return NextResponse.json({error:"Unable to write to the configured course backend."},{status:502});
  }
}
