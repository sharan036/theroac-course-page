import Cookies from "js-cookie";
import type {
  DashboardStats,
  User,
  PaginatedResponse,
  ModerationItem,
  PlatformHealth,
  CandidateResponse,
  AnalyticsResponse,
  MyJobsResponse,
  MyEventsResponse,
} from "./types";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.theroac.com/api";

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = Cookies.get("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    // Try to parse a JSON error body; fall back to status text
    let message = `API error ${res.status}`;
    try {
      const body = await res.json();
      message = body?.message ?? body?.error ?? message;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  return apiFetch<DashboardStats>("/admin/dashboard/stats");
}

export async function fetchUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  const query = new URLSearchParams();

  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  if (params?.status) query.set("status", params.status);

  const qs = query.toString();

  const res = await apiFetch<any>(`/admin/users${qs ? `?${qs}` : ""}`);

  return {
    data: res.users,
    ...res.pagination,
  };
}

export async function fetchModerationQueue(params?: {
  status?: string;
  limit?: number;
}): Promise<PaginatedResponse<ModerationItem>> {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.limit)  query.set("limit",  String(params.limit));

  const qs = query.toString();
  return apiFetch<PaginatedResponse<ModerationItem>>(
    `/moderation${qs ? `?${qs}` : ""}`
  );
}

export async function fetchPlatformHealth(): Promise<PlatformHealth> {
  return apiFetch<PlatformHealth>("/platform/health");
}

export async function approveModerationItem(id: string): Promise<void> {
  return apiFetch<void>(`/moderation/${id}/approve`, { method: "POST" });
}

export async function deleteModerationItem(id: string): Promise<void> {
  return apiFetch<void>(`/moderation/${id}`, { method: "DELETE" });
}

export async function notifications(role: string): Promise<any> {
  if(role !== "admin"){
   return apiFetch<any>(`/notifications`);
  }else{
    return apiFetch<any>(`/admin/notifications`);
  }
}

// Recruiter Dashboard API functions
export async function fetchRecruiterCandidates(params?: {
  page?: number;
  limit?: number;
}): Promise<CandidateResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  const qs = query.toString();
  return apiFetch<CandidateResponse>(`/dashboard/candidates${qs ? `?${qs}` : ""}`);
}

export async function fetchRecruiterAnalytics(): Promise<AnalyticsResponse> {
  return apiFetch<AnalyticsResponse>("/dashboard/analytics");
}

export async function fetchMyJobs(params?: {
  page?: number;
  limit?: number;
}): Promise<MyJobsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  const qs = query.toString();
  return apiFetch<MyJobsResponse>(`/jobs/my-jobs${qs ? `?${qs}` : ""}`);
}

export async function fetchMyEvents(params?: {
  page?: number;
  limit?: number;
}): Promise<MyEventsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  const qs = query.toString();
  return apiFetch<MyEventsResponse>(`/events/my-events${qs ? `?${qs}` : ""}`);
}

export async function updateApplicantStage(
  candidateId: string,
  stage: string
): Promise<any> {
  // Use the specialized recruiter candidate stage proxy path
  try {
    const finalId = candidateId.replace("job_", "");
    const res = await apiFetch<any>(`/jobs/applications/${finalId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status: stage }),
    });
    console.log("Stage update response:", res);
    // return res;
  } catch (error: any) {
    // // If original fails, try with PUT as fallback
    // try {
    //   return await apiFetch<any>(`/recruiter/candidates/${candidateId}/stage`, {
    //     method: "PUT",
    //     body: JSON.stringify({ stage }),
    //   });
    // } catch (putErr) {
    //   throw error; // throw original error if both fail
    // }
  }
}

export async function createJob(data: any): Promise<any> {
  return apiFetch<any>("/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createEvent(data: any): Promise<any> {
  return apiFetch<any>("/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getJobs(filters: any): Promise<any> {
    const queryParams = new URLSearchParams(filters).toString();
    return  apiFetch<any>(`/jobs${queryParams ? `?${queryParams}` : ''}`);
};

export async function getEvents(filters : any): Promise<any> {
    const queryParams = new URLSearchParams(filters).toString();
    return  apiFetch<any>(`/events${queryParams ? `?${queryParams}` : ''}`);
};

export async function getHubContent(filters : any): Promise<any> {
    const queryParams = new URLSearchParams(filters).toString();
    return  apiFetch<any>(`/hub-content${queryParams ? `?${queryParams}` : ''}`);
};