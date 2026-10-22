import type { Metadata } from "next";
import CourseEditor from "@/components/course-builder/CourseEditor";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Course Builder | ROAC", robots: { index: false, follow: false } };
export default function CourseAdminPage() { return <CourseEditor />; }
