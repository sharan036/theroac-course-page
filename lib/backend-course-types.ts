/** Matches the field names of the supplied Sequelize models.
 * Optional properties represent values the API may omit on selected endpoints.
 * Amounts are integer minor units; do not assume the API returns rupee floats.
 */
export type CourseStatus = "draft" | "under_review" | "published" | "archived";
export type CourseLevel = "beginner" | "intermediate" | "advanced" | "all";
export type EnrollmentType = "paid" | "free" | "coupon" | "admin_grant" | "organization";
export type EnrollmentStatus = "active" | "expired" | "refunded" | "suspended";

export type BackendCourse = {
  id: string;
  title: string;
  slug: string;
  benefits: string[];
  subtitle: string | null;
  description: string | null;
  thumbnail: string | null;
  previewVideo: string | null;
  instructorId: string;
  organizationId: string | null;
  categoryId: string | null;
  level: CourseLevel;
  language: string;
  price: number;
  discountPrice: number | null;
  currency: string;
  isFree: boolean;
  status: CourseStatus;
  isPublished: boolean;
  publishedAt: string | null;
  totalDurationMins: number;
  totalLessons: number;
  totalSections: number;
  totalEnrollments: number;
  totalRatings: number;
  averageRating: number | string;
  requirements: string[];
  whatYouLearn: string[];
  tags: string[];
  targetAudience: string[];
  hasCertificate: boolean;
  hasQuizzes: boolean;
  hasAssignments: boolean;
  accessDurationDays: number | null;
  isUnlisted: boolean;
};

export type BackendCourseCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  parentId: string | null;
  order: number;
  isActive: boolean;
};
export type BackendCourseSection = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  order: number;
  totalLessons: number;
  totalDurationMins: number;
  isPublished: boolean;
};

/** Enrollment data belongs to authenticated learner/admin functionality, never public course page payloads. */
export type BackendCourseEnrollment = {
  id: string;
  userId: string;
  courseId: string;
  paymentId: string | null;
  couponId: string | null;
  enrollmentType: EnrollmentType;
  amountPaid: number; // amountPaid is documented in paise in CourseEnrollment.js
  progressPercent: number;
  lessonsCompleted: number;
  isCompleted: boolean;
  completedAt: string | null;
  lastAccessedAt: string | null;
  enrolledAt: string;
  expiresAt: string | null;
  status: EnrollmentStatus;
};

/** Only columns that a course-content editor should be able to update.
 * Never send counters (totalEnrollments, averageRating, etc.) from this dashboard.
 */
export type BackendCourseUpdate = Pick<BackendCourse,
  "title" | "subtitle" | "description" | "thumbnail" | "previewVideo"
  | "benefits" | "requirements" | "whatYouLearn" | "tags" | "targetAudience"
  | "level" | "language"
>;

export const COURSE_LEVELS: CourseLevel[] = ["beginner","intermediate","advanced","all"];

export function toCourseUpdate(model: BackendCourse): BackendCourseUpdate {
  return {
    title: model.title,
    subtitle: model.subtitle,
    description: model.description,
    thumbnail: model.thumbnail,
    previewVideo: model.previewVideo,
    benefits: model.benefits,
    requirements: model.requirements,
    whatYouLearn: model.whatYouLearn,
    tags: model.tags,
    targetAudience: model.targetAudience,
    level: model.level,
    language: model.language,
  };
}
export function validateCourseUpdate(v: unknown): v is BackendCourseUpdate {
  if (!v || typeof v !== "object") return false;
  const value = v as BackendCourseUpdate;
  const str = (s: unknown, max=5000) => typeof s==="string" && s.length<=max;
  const array = (a: unknown) => Array.isArray(a) && a.length<=60 && a.every(x=>str(x,500));
  return str(value.title,255) && value.title.trim().length>0
    && (value.subtitle===null || str(value.subtitle,255))
    && (value.description===null || str(value.description,10000))
    && (value.thumbnail===null || str(value.thumbnail,2000))
    && (value.previewVideo===null || str(value.previewVideo,2000))
    && [value.benefits,value.requirements,value.whatYouLearn,value.tags,value.targetAudience].every(array)
    && COURSE_LEVELS.includes(value.level) && str(value.language,100);
}
