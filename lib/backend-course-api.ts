import type { BackendCourse, BackendCourseCategory, BackendCourseSection } from "@/lib/backend-course-types";
import type { Course } from "@/lib/course-types";

export type CourseDetail = {
  course: BackendCourse;
  sections: BackendCourseSection[];
  category: BackendCourseCategory | null;
};
type ObjectValue = Record<string, unknown>;
const isObject = (value: unknown): value is ObjectValue =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/** Existing frontend API base from src/lib/api/client.ts. */
export const ROAC_API_BASE_URL =
  process.env.ROAC_COURSE_BACKEND_BASE_URL?.trim() ||
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  "https://api.theroac.com/api";

/**
 * Explicit opt-in prevents an existing page from becoming a 404 until its
 * canonical Course row has been created and published in TheROAC.
 */
export function backendDetailConfigured() {
  return process.env.ROAC_COURSE_BACKEND_ENABLED === "true";
}

export function backendUpdateConfigured(token?: string) {
  return backendDetailConfigured() && Boolean(token);
}

/** Paths verified in TheROAC/Server/src/app.js and routes/course.js. */
export function courseReadPath(slug: string) {
  return "/learn/courses/" + encodeURIComponent(slug);
}
export function courseUpdatePath(id: string) {
  return "/learn/courses/" + encodeURIComponent(id);
}
export function dashboardCourseListPath(slug: string) {
  return "/learn/dashboard/courses?search=" + encodeURIComponent(slug) + "&limit=100";
}
export function dashboardCourseDetailPath(id: string) {
  return "/learn/dashboard/courses/" + encodeURIComponent(id);
}

function backendURL(path: string) {
  const base = new URL(ROAC_API_BASE_URL);
  if (!["https:","http:"].includes(base.protocol)) throw new Error("Backend URL must be HTTP(S)");
  const prefix = base.pathname.replace(/\/+$/, "");
  const url = new URL(base.origin + prefix + path);
  if (url.origin !== base.origin || !url.pathname.startsWith(prefix + "/")) {
    throw new Error("Invalid backend path");
  }
  return url.href;
}
async function readJSON(path: string, token?: string): Promise<unknown> {
  const response = await fetch(backendURL(path), {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) return null;
  return response.json();
}

function parseCourse(value: unknown): CourseDetail | null {
  if (!isObject(value)) return null;
  const envelope = isObject(value.data) ? value.data : value;
  const record = isObject(envelope.course) ? envelope.course : envelope;
  if (typeof record.id !== "string" ||
      typeof record.slug !== "string" ||
      typeof record.title !== "string") return null;
  const rawSections = Array.isArray(envelope.sections)
    ? envelope.sections
    : Array.isArray(record.sections) ? record.sections : [];
  // NEVER pass Lesson content/resources to the page builder or public page.
  const sections = rawSections.filter(s => isObject(s) &&
    typeof s.id === "string" &&
    typeof s.title === "string" &&
    typeof s.order === "number")
    .map(s => ({
      id: s.id as string,
      courseId: (s.courseId as string) || record.id as string,
      title: s.title as string,
      description: typeof s.description === "string" ? s.description : null,
      order: s.order as number,
      totalLessons: typeof s.totalLessons === "number" ? s.totalLessons : 0,
      totalDurationMins: typeof s.totalDurationMins === "number" ? s.totalDurationMins : 0,
      isPublished: s.isPublished === true,
    }));
  const category = isObject(record.category)
    ? record.category as BackendCourseCategory
    : isObject(envelope.category) ? envelope.category as BackendCourseCategory : null;
  // The instructor dashboard can include analytics, reviews, enrollment PII.
  // Return only Course model fields, not raw API envelopes or nested associations.
  const fields = [
    "id","title","slug","benefits","subtitle","description","thumbnail","previewVideo",
    "instructorId","organizationId","categoryId","level","language","price",
    "discountPrice","currency","isFree","status","isPublished","publishedAt",
    "totalDurationMins","totalLessons","totalSections","totalEnrollments",
    "totalRatings","averageRating","requirements","whatYouLearn","tags",
    "targetAudience","hasCertificate","hasQuizzes","hasAssignments",
    "accessDurationDays","isUnlisted",
  ];
  const cleaned: ObjectValue = {};
  for (const name of fields) if (name in record) cleaned[name] = record[name];
  return { course: cleaned as BackendCourse, sections, category };
}

/** Public endpoint: GET /api/learn/courses/:slug is optional-auth, published only. */
export async function getBackendCourse(slug: string): Promise<CourseDetail | null> {
  if (!backendDetailConfigured()) return null;
  return parseCourse(await readJSON(courseReadPath(slug)));
}

/**
 * Instructor/admin endpoints: GET /api/learn/dashboard/courses?search=...,
 * then GET /api/learn/dashboard/courses/:courseId.
 *
 * Using a course's exact slug avoids resolving a similarly named course.
 * The backend enforces authentication, role, and instructor scoping.
 */
export async function getBackendAdminCourse(slug: string, token: string): Promise<CourseDetail | null> {
  if (!backendDetailConfigured() || !token) return null;
  const listing = await readJSON(dashboardCourseListPath(slug), token);
  if (!isObject(listing) || !Array.isArray(listing.courses)) return null;
  const match = listing.courses.find(item => isObject(item) &&
    item.slug === slug && typeof item.id === "string");
  if (!isObject(match) || typeof match.id !== "string") return null;
  const detail = await readJSON(dashboardCourseDetailPath(match.id), token);
  return parseCourse(detail);
}

/** Course page data from backend overlays presentation-only CMS data. */
export function fromBackendCourse(page: Course, data: CourseDetail): Course {
  const model = data.course;
  const copy: Course = structuredClone(page);
  // Use subtitle for the hero; title remains the canonical Course title/slug.
  if (model.subtitle) copy.hero.title = model.subtitle;
  if (model.description) copy.hero.description = model.description;
  copy.seo.title = model.title + " | " + page.brand.name;
  copy.seo.description = model.description || copy.seo.description;
  // Public course-details response does not include sections.
  // Never fetch authenticated /curriculum using a privileged token for a public page.
  // The landing page uses the public presentation curriculum until a safe,
  // public, metadata-only endpoint is added to TheROAC.
  return copy;
}

/** Requires existing ROAC bearer token with instructor/admin permissions. */
export async function writeBackendCourse(id: string, token: string, update: unknown) {
  const response = await fetch(backendURL(courseUpdatePath(id)), {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(update),
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) return { ok:false, status:response.status, course:null };
  const result: unknown = await response.json();
  const parsed = parseCourse(result);
  return { ok:true, status:response.status, course:parsed?.course || null };
}
