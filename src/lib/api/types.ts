export interface PaginatedResponse<T> {
  users: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  overview: {
    totalUsers: number;
    totalCandidates: number;
    totalRecruiters: number;
    totalJobs: number;
    activeJobs: number;
    totalEvents: number;
    upcomingEvents: number;
    totalApplications: number;
    pendingApplications: number;
    pendingUsers: number;
    pendingJobApprovals: number;
    pendingEventApprovals: number;
    pendingInternshipApprovals: number;
    pendingROACPrimeApprovals: number;
    unreadNotifications: number;
  };
  growth: {
    newUsers: number;
    newCandidates: number;
    newRecruiters: number;
    newJobs: number;
    newEvents: number;
    newApplications: number;
  };
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  location: string;
  profileScore: number;
  jobMatches: number;
  status: "active" | "inactive" | "banned";
  avatarUrl?: string;
  companyName?: string;
  createdAt: string;
  lastLogin: string;
  role: "candidate" | "recruiter" | "admin";
}

export interface Recruiter {
  id: string;
  companyName: string;
  adminName: string;
  activeJobs: number;
  totalApplicants: number;
  plan: "free" | "hire_pro" | "enterprise";
  status: "active" | "suspended";
  createdAt: string;
}

export interface NotificationAPI {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  readAt?: string;
  actionUrl?: string;
  icon?: string | null;
  priority?: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export interface UINotification {
  id: string;
  type?: string;
  title: string;
  message: string;
  read: boolean;
  isRead?: boolean;
  createdAt: string;
  actionUrl?: string;
  userId?: string;
  readAt?: string | null;
  updatedAt?: string;
  icon?: string | null;
  priority?: "low" | "medium" | "high";
  data?: Record<string, any>;
}

export type ModerationItemType = "flagged_resume" | "pending_job" | "reported_user";
export type ModerationStatus   = "pending" | "approved" | "rejected";

export interface ModerationItem {
  id: string;
  type: ModerationItemType;
  title: string;
  description: string;
  status: ModerationStatus;
  createdAt: string;
}

export interface PlatformHealth {
  serverLoad: number;
  dbLatencyMs: number;
  apiUptimePct: number;
  errorRatePct: number;
}

export type HealthStatus = "NOMINAL" | "GOOD" | "HEALTHY" | "LOW" | "WARNING" | "CRITICAL";

export interface HealthMetricData {
  label: string;
  value: string;
  status: HealthStatus;
  pct: number;
}

export interface PlatformHealthData {
  serverLoad: HealthMetricData;
  dbLatency: HealthMetricData;
  apiUptime: HealthMetricData;
  errorRate: HealthMetricData;
  fetchedAt: string;
}

export interface RecruiterEvent {
  startDate: string;
  opportunityType: string;
  id: string;
  title: string;
  type: string;
  slug: string;
  approvalStatus: string;
  endDate: string;
  date: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  registrations: number;
  views: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyEventsResponse {
  success: boolean;
  counts: {
    approved: number;
    pending: number;
    rejected: number;
    total: number;
  };
  data: RecruiterEvent[];
  pending: RecruiterEvent[];
  rejected: RecruiterEvent[];
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface CandidateExperience {
  title: string;
  company: string;
  duration: string;
}

export interface CandidateEducation {
  degree: string;
  institute: string;
  duration: string;
}

export interface RecruiterJob {
  id: string;
  title: string;
  slug: string;
  companyName: string;
  jobType: string;
  locationType: string;
  location: string;
  status: "open" | "closed" | "draft";
  approvalStatus: string;
  applications: number;
  urgent: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MyJobsResponse {
  jobs: RecruiterJob[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface RecruiterCandidate {
  id: string;
  originalId: string;
  type: "job" | "internship";
  name: string;
  email: string;
  position: string;
  department: string;
  stage: string;
  appliedDate: string;
  daysAgo: number;
  score: number;
  nextAction: string;
  skills: string[];
  resumeLink: string | null;
  coverLetter: string;
  location: string;
  createdAt: string;
  phone: string;
  headline: string | null;
  about: string | null;
  experiences: CandidateExperience[];
  education: CandidateEducation[];
  profilePicture: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

export interface CandidateResponse {
  candidates: RecruiterCandidate[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface MonthlyAnalytics {
  month: string;
  applications: number;
  interviews: number;
  hires?: number;
}

export interface AnalyticsResponse {
  monthlyData: MonthlyAnalytics[];
}