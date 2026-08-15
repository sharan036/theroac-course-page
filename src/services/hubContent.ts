import axiosInstance from "@/src/lib/axios";

// ─── Shared ────────────────────────────────────────────────────────────────

export interface Salary {
  amount: number | null;
  currency?: string;
  period?: string;
}

// ─── Job ───────────────────────────────────────────────────────────────────

export interface Job {
  _type: "job";
  salary: Salary | null;
  id: string;
  title: string;
  slug: string;
  companyName: string;
  companyLogo: string | null;
  companyDescription: string | null;
  companyWebsite: string | null;
  companySocials: Record<string, string> | null;
  bannerImage: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  qualifications: string | null;
  benefits: string | null;
  perks?: string[] | null;
  eligibility: string[] | null;
  faqs: { question: string; answer: string }[];
  jobType: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  experienceLevel: "fresher" | "junior" | "mid" | "senior" | "lead";
  locationType: "onsite" | "remote" | "hybrid";
  location: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  applicationDeadline: string | null;
  applyLink: string | null;
  applyEmail: string | null;
  skills: string[];
  categories: string[];
  department: string | null;
  numberOfPositions: number;
  media: any[] | null;
  contactPerson: string | null;
  status: "open" | "closed" | "paused";
  approvalStatus: "approved" | "pending" | "rejected";
  approvedBy: string;
  approvedAt: string;
  rejectionReason: string | null;
  featured: boolean;
  urgent: boolean;
  views: number;
  applications: number;
  stages: any[];
  workingDays: string[];
  jobSchedule: string[];
  hideOpenings: boolean;
  festivalCampaign: any | null;
  applicationSettings: any | null;
  importantDates: any | null;
  attachments: any | null;
  gallery: any | null;
  mobileBanner: string | null;
  themeColor: string | null;
  terms: string | null;
  additionalNotes: string | null;
  createdBy: string;
  organizationId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// ─── Event ─────────────────────────────────────────────────────────────────

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface Stage {
  id: string;
  title: string;
  date: string;
  description: string;
  weight: string;
}

export interface Speaker {
  name: string;
  title: string;
  company: string;
  avatar: string;
}

export interface Sponsor {
  name: string;
  logo: string;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

export interface Event {
  _type: "event";
  id: string;
  title: string;
  slug: string;
  companyName: string;
  companyLogo: string | null;
  description: string;
  bannerImage: string | null;
  thumbnailImage: string | null;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  approvalStatus: "approved" | "pending" | "rejected";
  approvedBy: string;
  approvedAt: string | null;
  rejectionReason: string | null;
  locationType: "online" | "offline" | "hybrid";
  location: string | null;
  venue: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  venueAddress: string | null;
  mapLink: string | null;
  eligibility: string | null;
  tags: string[];
  categories: string[];
  prizes: any[];
  registrationLink: string | null;
  registrationFee: string | null;
  maxParticipants: number | null;
  agenda: AgendaItem[];
  stages: Stage[];
  speakers: Speaker[];
  sponsors: Sponsor[];
  media: any[] | null;
  requirements: string | null;
  whatToBring: string[];
  contactInfo: string | null;
  socials: any | null;
  socialLinks: SocialLinks | null;
  faqs: { question: string; answer: string }[];
  featured: boolean;
  views: number;
  registrations: number;
  minTeamSize: number;
  maxTeamSize: number;
  problemStatements: any | null;
  opportunityType: string;
  opportunitySubType: string | null;
  organizationName: string;
  participationType: "individual" | "team";
  mode: "online" | "offline" | "hybrid";
  workingDays: any | null;
  hideOpenings: boolean;
  festivalCampaign: any | null;
  registrationSettings: any | null;
  prizesList: any | null;
  prizeDescription: string | null;
  prizeDeliverDays: number | null;
  participationCertificate: boolean;
  paymentSettings: any | null;
  importantDates: any | null;
  attachments: any | null;
  gallery: any | null;
  mobileBanner: string | null;
  themeColor: string | null;
  terms: string | null;
  additionalNotes: string | null;
  createdBy: string;
  organizationId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// ─── Internship (extend Job shape as needed) ───────────────────────────────

export type Internship = Omit<Job, "_type"> & { _type: "internship" };

// ─── Hackathon (extend Event shape as needed) ──────────────────────────────

export type Hackathon = Omit<Event, "_type"> & { _type: "hackathon" };

// ─── Feed response ─────────────────────────────────────────────────────────

export interface FeedMeta {
  fetchedAt: string;
  counts: {
    jobs: number;
    internships: number;
    events: number;
    hackathons: number;
    primeHub: number;
  };
}

export interface FeedResponse {
  jobs: Job[];
  internships: Internship[];
  events: Event[];
  hackathons: Hackathon[];
  primeHub: any[];
  meta: FeedMeta;
}

// Convenience union for components that render mixed lists
export type FeedItem = Job | Internship | Event | Hackathon;

// ─── Service ───────────────────────────────────────────────────────────────

export const hubContentService = {
  /** Fetch the full feed (all content types in one call) */
  async getFeed(signal?: AbortSignal): Promise<FeedResponse> {
    try {
      const response = await axiosInstance.get<FeedResponse>("feed/allData", { signal });
      return (
        response.data ?? {
          jobs: [],
          internships: [],
          events: [],
          hackathons: [],
          primeHub: [],
          meta: {
            fetchedAt: new Date().toISOString(),
            counts: { jobs: 0, internships: 0, events: 0, hackathons: 0, primeHub: 0 },
          },
        }
      );
    } catch (error: any) {
      if (
        error?.name === "AbortError" ||
        error?.name === "CanceledError" ||
        error?.code === "ERR_CANCELED"
      ) {
        throw error;
      }
      console.error("Error fetching feed:", error);
      return {
        jobs: [],
        internships: [],
        events: [],
        hackathons: [],
        primeHub: [],
        meta: {
          fetchedAt: new Date().toISOString(),
          counts: { jobs: 0, internships: 0, events: 0, hackathons: 0, primeHub: 0 },
        },
      };
    }
  },

  /** All items from every category as a flat array */
  async getAllContent(signal?: AbortSignal): Promise<FeedItem[]> {
    const feed = await this.getFeed(signal);
    return [
      ...feed.jobs,
      ...feed.internships,
      ...feed.events,
      ...feed.hackathons,
    ];
  },

  async getJobs(): Promise<Job[]> {
    try {
      const response = await axiosInstance.get<{ jobs: Job[] }>("/jobs");
      return response.data?.jobs ?? [];
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
  },

  async getEvents(): Promise<Event[]> {
    try {
      const response = await axiosInstance.get("/events");
      const events = response.data?.data;
      
      if (Array.isArray(events)) {
        return events as Event[];
      }
      return [];
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  },

  async getFeaturedContent(): Promise<FeedItem[]> {
    const all = await this.getAllContent();
    return all.filter((item) => item.featured);
  },

  async getContentByType(type: FeedItem["_type"]): Promise<FeedItem[]> {
    const feed = await this.getFeed();
    const map: Record<FeedItem["_type"], FeedItem[]> = {
      job: feed.jobs,
      internship: feed.internships,
      event: feed.events,
      hackathon: feed.hackathons,
    };
    return map[type] ?? [];
  },

  async getContentById(id: string): Promise<FeedItem | null> {
    const all = await this.getAllContent();
    return all.find((item) => item.id === id) ?? null;
  },

  async searchContent(query: string): Promise<FeedItem[]> {
    const all = await this.getAllContent();
    const q = query.toLowerCase();
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.companyName?.toLowerCase().includes(q)
    );
  },
};
