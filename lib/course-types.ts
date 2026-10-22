import type { BackendCourse, BackendCourseSection, BackendCourseCategory } from "@/lib/backend-course-types";
export type SectionId = "challenge" | "overview" | "weeks" | "projects" | "selection" | "details" | "ctaSection" | "faqs";

export type CourseItem = { title: string; description: string };
export type TextSection = { eyebrow: string; title: string; description: string; items: CourseItem[] };
export type Course = {
  slug: string;
  /** Hydrated from the existing course backend; never saved into the presentation CMS JSON. */
  backend?: { course: BackendCourse; sections: BackendCourseSection[]; category: BackendCourseCategory | null };
  brand: { name: string; logoUrl: string; logoAlt: string };
  seo: { title: string; description: string };
  theme: {
    accent: string; ink: string; background: string; surface: string; muted: string;
    font: "inter" | "dm-sans" | "system"; heroSize: number; bodySize: number;
    radius: number; contentWidth: number; sectionSpacing: number;
    heroAlignment: "left" | "center"; buttonShape: "rounded" | "pill" | "square";
  };
  hero: {
    eyebrow: string; title: string; description: string; tagline: string;
    cta: string; ctaUrl: string; finePrint: string; metrics: CourseItem[];
  };
  challenge: { eyebrow: string; title: string; description: string; items: string[] };
  overview: TextSection;
  weeks: TextSection;
  projects: TextSection;
  selection: TextSection;
  details: TextSection;
  ctaSection: { eyebrow: string; title: string; description: string; cta: string; finePrint: string };
  faqs: TextSection;
  sections: { id: SectionId; visible: boolean }[];
};

export const SECTION_LABELS: Record<SectionId, string> = {
  challenge: "The Challenge",
  overview: "Overview",
  weeks: "Curriculum",
  projects: "What You'll Build",
  selection: "Selection",
  details: "Program Details",
  ctaSection: "Apply",
  faqs: "FAQs",
};
export const SECTION_IDS = Object.keys(SECTION_LABELS) as SectionId[];
export function validLink(value: string): boolean {
  if (!value) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (value.startsWith("#")) return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}
export function validateCourse(value: unknown): value is Course {
  if (!value || typeof value !== "object") return false;
  const c = value as Course;
  const text = (v: unknown, max = 3000) => typeof v === "string" && v.length <= max;
  const list = (v: unknown, max = 30) => Array.isArray(v) && v.length <= max;
  const rows = (v: unknown) => list(v) && (v as CourseItem[]).every((i) => i && text(i.title, 180) && text(i.description));
  const section = (s: TextSection) => s && text(s.eyebrow, 150) && text(s.title, 300) && text(s.description) && rows(s.items);
  const color = (s: unknown) => typeof s === "string" && /^#[0-9a-fA-F]{6}$/.test(s);
  const range = (n: unknown, min: number, max: number) => typeof n === "number" && Number.isFinite(n) && n >= min && n <= max;
  const t = c.theme;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug || "") || c.slug.length > 65) return false;
  if (!c.brand || !text(c.brand.name, 100) || !text(c.brand.logoAlt, 100) || !text(c.brand.logoUrl, 600) || (c.brand.logoUrl && !validLink(c.brand.logoUrl))) return false;
  if (!c.seo || !text(c.seo.title, 200) || !text(c.seo.description, 700)) return false;
  if (!t || ![t.accent,t.ink,t.background,t.surface,t.muted].every(color) || !["inter","dm-sans","system"].includes(t.font)
      || !range(t.heroSize,32,100) || !range(t.bodySize,12,22) || !range(t.radius,0,48)
      || !range(t.contentWidth,720,1440) || !range(t.sectionSpacing,32,160)
      || !["left","center"].includes(t.heroAlignment) || !["rounded","pill","square"].includes(t.buttonShape)) return false;
  if (!c.hero || ![c.hero.eyebrow,c.hero.title,c.hero.description,c.hero.tagline,c.hero.cta,c.hero.finePrint].every((v) => text(v))
      || !text(c.hero.ctaUrl,600) || !rows(c.hero.metrics) || (c.hero.ctaUrl && !validLink(c.hero.ctaUrl))) return false;
  if (!c.challenge || ![c.challenge.eyebrow,c.challenge.title,c.challenge.description].every(v => text(v))
      || !list(c.challenge.items) || !c.challenge.items.every(v => text(v))) return false;
  if (![c.overview,c.weeks,c.projects,c.selection,c.details,c.faqs].every(section)) return false;
  if (!c.ctaSection || ![c.ctaSection.eyebrow,c.ctaSection.title,c.ctaSection.description,c.ctaSection.cta,c.ctaSection.finePrint].every(v => text(v))) return false;
  if (!list(c.sections,8) || c.sections.length !== 8 || new Set(c.sections.map(s => s.id)).size !== 8
      || !c.sections.every(s => SECTION_IDS.includes(s.id) && typeof s.visible === "boolean")) return false;
  return true;
}
