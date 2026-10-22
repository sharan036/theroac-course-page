import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseLanding from "@/components/course-builder/CourseLanding";
import { loadCourse } from "@/lib/course-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await loadCourse(slug);
  return course ? {
    title: course.seo.title, description: course.seo.description,
    openGraph: { title: course.seo.title, description: course.seo.description },
  } : { title: "Course not found" };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await loadCourse(slug);
  if (!course) notFound();
  return <CourseLanding course={course} />;
}
