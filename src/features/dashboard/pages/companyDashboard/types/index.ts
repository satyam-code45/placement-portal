// Company Dashboard Types

// Route constants for internal navigation (relative paths for nested routes)
export const COMPANY_ROUTES = {
  DASHBOARD: "dashboard",
  POST_JOB: "post-job",
  MY_JOBS: "my-jobs",
  APPLICATIONS: "applications",
  CANDIDATES: "candidates",
  ANALYTICS: "analytics",
  PROFILE: "profile",
  SETTINGS: "settings",
} as const;

// Full route paths (for navigation from other parts of app)
export const COMPANY_DASHBOARD_ROUTE = "/dashboard/company";
export const COMPANY_POST_JOB_ROUTE = "/dashboard/company/post-job";
export const COMPANY_MY_JOBS_ROUTE = "/dashboard/company/my-jobs";
export const COMPANY_APPLICATIONS_ROUTE = "/dashboard/company/applications";
export const COMPANY_CANDIDATES_ROUTE = "/dashboard/company/candidates";
export const COMPANY_ANALYTICS_ROUTE = "/dashboard/company/analytics";
export const COMPANY_PROFILE_ROUTE = "/dashboard/company/profile";
export const COMPANY_SETTINGS_ROUTE = "/dashboard/company/settings";

// Types
export interface JobPosting {
  id: string;
  jobTitle: string;
  jobRoleCategory: string;
  department: string;
  employmentType: "full-time" | "internship" | "contract" | "part-time";
  seniorityLevel: "junior" | "mid" | "senior" | "lead" | "principal";
  description: string;
  workMode: "remote" | "on-site" | "hybrid";
  location: string;
  city: string;
  state: string;
  country: string;
  salaryMin: number;
  salaryMax: number;
  eligibleBatches: string[];
  eligibleDegrees: string[];
  minCgpa: number;
  backlogAllowed: boolean;
  workAuthRequired: boolean;
  requiredSkills: string[];
  branches: string[];
  interviewMode: "online" | "offline" | "hybrid";
  noticePeriodLimit?: number;
  deadline: string;
  status: "draft" | "published" | "closed";
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  resumeUrl: string;
  cgpa: number;
  branch: string;
  batch: string;
  status:
    | "pending"
    | "shortlisted"
    | "rejected"
    | "interviewed"
    | "offered"
    | "accepted";
  appliedAt: string;
  notes?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  cgpa: number;
  branch: string;
  batch: string;
  skills: string[];
  resumeUrl: string;
  applications: Application[];
}
