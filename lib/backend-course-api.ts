import type { BackendCourse, BackendCourseCategory, BackendCourseSection } from "@/lib/backend-course-types";
import type { Course } from "@/lib/course-types";

type CourseDetail = { course: BackendCourse; sections: BackendCourseSection[]; category: BackendCourseCategory | null };
type UnknownObject = Record<string, unknown>;
const object = (x: unknown): x is UnknownObject => Boolean(x && typeof x === "object" && !Array.isArray(x));

export function backendDetailConfigured() {
  return Boolean(process.env.ROAC_COURSE_DETAIL_PATH && (process.env.ROAC_COURSE_BACKEND_BASE_URL || process.env.NEXT_PUBLIC_API_URL));
}
export function backendUpdateConfigured() {
  return backendDetailConfigured() && Boolean(process.env.ROAC_COURSE_UPDATE_PATH && process.env.ROAC_BACKEND_ADMIN_TOKEN);
}

/** URL path templates MUST be supplied from the backend's actual routes/controllers.
 * The uploaded Sequelize models do not define any HTTP endpoint names.
 */
function endpoint(pathTemplate: string, selector: "id" | "slug", value: string) {
  const base = process.env.ROAC_COURSE_BACKEND_BASE_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!base || !/^https?:\/\//.test(base)) throw new Error("Invalid backend base URL");
  if (!pathTemplate.startsWith("/") || pathTemplate.startsWith("//") || !pathTemplate.includes(`{${selector}}`)) {
    throw new Error(`ROAC_COURSE_${selector.toUpperCase()} path must contain {${selector}}`);
  }
  const path = pathTemplate.replace(`{${selector}}`,encodeURIComponent(value));
  const url = new URL(base.replace(/\/+$/,"") + path);
  const allowed = new URL(base);
  if (url.origin !== allowed.origin || !url.pathname.startsWith(allowed.pathname.replace(/\/+$/,"") + "/")) {
    throw new Error("Invalid course API destination");
  }
  return url.toString();
}

export function readEndpoint(slug: string) {
  return endpoint(process.env.ROAC_COURSE_DETAIL_PATH || "", "slug", slug);
}
export function updateEndpoint(id: string) {
  return endpoint(process.env.ROAC_COURSE_UPDATE_PATH || "", "id", id);
}

function unpack(input: unknown): CourseDetail | null {
  if (!object(input)) return null;
  // Support direct Course object, { course, sections, category } and { data: { course, sections, category } }.
  const data = object(input.data) ? input.data : input;
  const record = object(data.course) ? data.course : data;
  if (typeof record.id !== "string" || typeof record.slug !== "string" || typeof record.title !== "string") return null;
  const sections = Array.isArray(data.sections) ? data.sections : Array.isArray(record.sections) ? record.sections : [];
  const category = object(data.category) ? data.category : object(record.category) ? record.category : null;
  return {
    course: record as BackendCourse,
    sections: sections.filter(x=>object(x) && typeof x.title==="string" && typeof x.order==="number") as BackendCourseSection[],
    category: category as BackendCourseCategory | null,
  };
}
export async function getBackendCourse(slug: string, token?: string): Promise<CourseDetail | null> {
  if (!backendDetailConfigured()) return null;
  const response = await fetch(readEndpoint(slug), {
    cache:"no-store",
    headers: { Accept:"application/json", ...(token ? { Authorization:`Bearer ${token}` } : {}) },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) return null;
  return unpack(await response.json());
}
export function fromBackendCourse(page: Course, data: CourseDetail): Course {
  const model = data.course;
  const copy: Course = structuredClone(page);
  copy.backend = data;
  copy.slug = model.slug;
  // Course.subtitle is a short descriptor of the course; preserve landing copy when absent.
  if (model.subtitle) copy.hero.title = model.subtitle;
  if (model.description) copy.hero.description = model.description;
  copy.seo.title = `${model.title} | ${page.brand.name}`;
  copy.seo.description = model.description || copy.seo.description;
  if (data.sections.length) {
    copy.weeks.items = data.sections.filter(s=>s.isPublished).sort((a,b)=>a.order-b.order)
      .map(s=>({title:s.title,description:s.description || ""}));
  }
  // Course benefits/requirements/targetAudience/learn outcomes remain available
  // under backend.course; no fake course sections or enrollment counts are generated.
  return copy;
}
