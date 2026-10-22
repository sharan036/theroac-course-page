import defaultCourse from "@/data/course-default.json";
import { backendDetailConfigured, fromBackendCourse, getBackendCourse } from "@/lib/backend-course-api";
import type { Course } from "@/lib/course-types";
import { validateCourse } from "@/lib/course-types";

const REPOSITORY = process.env.ROAC_CMS_REPO || "sharan036/theroac-course-page";
const BRANCH = process.env.ROAC_CMS_BRANCH || "cms-course-content";
const FILE_PATH = "content/courses.json";

export type Catalog = { courses: Course[]; sha: string | null; source: "github" | "fallback" };

function apiUrl() {
  if (!/^[\w.-]+\/[\w.-]+$/.test(REPOSITORY)) throw new Error("Invalid CMS repository");
  return `https://api.github.com/repos/${REPOSITORY}/contents/${FILE_PATH}`;
}
function headers(): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(process.env.ROAC_GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.ROAC_GITHUB_TOKEN}` } : {}),
  };
}
export async function loadCatalog(): Promise<Catalog> {
  const fallback: Catalog = { courses: [defaultCourse as unknown as Course], sha: null, source: "fallback" };
  try {
    const response = await fetch(`${apiUrl()}?ref=${encodeURIComponent(BRANCH)}`, { headers: headers(), cache: "no-store" });
    if (!response.ok) return fallback;
    const file = await response.json() as { sha: string; content: string };
    const parsed: unknown = JSON.parse(Buffer.from(file.content.replace(/\s/g, ""), "base64").toString("utf8"));
    if (!parsed || typeof parsed !== "object" || !("courses" in parsed)) return fallback;
    const items = (parsed as { courses: unknown }).courses;
    if (!Array.isArray(items) || !items.every(validateCourse)) return fallback;
    return { courses: items, sha: file.sha, source: "github" };
  } catch {
    return fallback;
  }
}
export async function loadCourse(slug: string): Promise<Course | undefined> {
  const catalog = await loadCatalog();
  const page = catalog.courses.find(course => course.slug === slug);
  if (!page) return undefined;
  if (!backendDetailConfigured()) return page;
  // When backend mode is explicitly enabled, only published courses can go public.
  // Fail closed if the backend cannot confirm a course's publication state.
  try {
    const detail = await getBackendCourse(slug);
    if (!detail || detail.course.status !== "published" || detail.course.isPublished !== true) return undefined;
    return fromBackendCourse(page, detail);
  } catch {
    return undefined;
  }
}
export async function publishCourse(course: Course, expectedSha: string | null) {
  if (!process.env.ROAC_GITHUB_TOKEN) throw new Error("ROAC_GITHUB_TOKEN is missing");
  if (!validateCourse(course)) throw new Error("Invalid course fields");
  const current = await loadCatalog();
  if (current.source !== "github" || !current.sha) throw new Error("CMS content could not be loaded");
  if (current.sha !== expectedSha) throw new Error("Conflict: course data changed. Reload the editor before publishing.");
  const next = current.courses.filter(item => item.slug !== course.slug);
  // Save design/presentation fields only. Course records come from the backend.
  const { backend: ignored, ...presentation } = course;
  void ignored;
  next.push(presentation as Course);
  const body = {
    message: `content: publish course ${course.slug}`,
    content: Buffer.from(JSON.stringify({ courses: next }, null, 2) + "\n", "utf8").toString("base64"),
    sha: current.sha,
    branch: BRANCH,
  };
  const response = await fetch(apiUrl(), {
    method: "PUT", headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify(body), cache: "no-store",
  });
  if (response.status === 409 || response.status === 422) throw new Error("Conflict: reload the editor and try again");
  if (!response.ok) throw new Error(`GitHub rejected the update (HTTP ${response.status})`);
  const result = await response.json() as { content: { sha: string } };
  return { sha: result.content.sha };
}
