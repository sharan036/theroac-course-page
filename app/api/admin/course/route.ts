import { NextRequest, NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/course-auth";
import { loadCatalog, publishCourse } from "@/lib/course-store";
import { validateCourse } from "@/lib/course-types";

export const dynamic = "force-dynamic";
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const catalog = await loadCatalog();
  return NextResponse.json(catalog, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  const maxBytes = 100_000;
  if (Number(request.headers.get("content-length") || "0") > maxBytes) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  let data: unknown;
  try { data = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!data || typeof data !== "object" || !("course" in data) || !("expectedSha" in data)) return NextResponse.json({ error: "Course or version is missing" }, { status: 400 });
  const { course, expectedSha } = data as { course: unknown; expectedSha: unknown };
  if (!validateCourse(course) || !(expectedSha === null || typeof expectedSha === "string")) return NextResponse.json({ error: "Invalid course fields" }, { status: 400 });
  try {
    const result = await publishCourse(course, expectedSha);
    return NextResponse.json({ ok: true, ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to publish course";
    const status = message.startsWith("Conflict") ? 409 : message.includes("missing") || message.includes("could not be loaded") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
