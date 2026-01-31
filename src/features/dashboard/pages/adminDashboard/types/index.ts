// Admin Dashboard Types

// Route constants for internal navigation (relative paths for nested routes)
export const ADMIN_ROUTES = {
  DASHBOARD: "dashboard",
  OPPORTUNITIES: "opportunities",
  ADD_OPPORTUNITY: "opportunities/add",
  COMPANIES: "companies",
  OUTREACH: "outreach",
  HEADLINES: "headlines",
  STUDENTS_ANALYTICS: "students-analytics",
  COMPANY_ANALYTICS: "company-analytics",
  MOCK_INTERVIEWS: "mock-interviews",
  REVIEW_JOBS: "review-jobs",
  ALUMNI: "alumni",
  ANNOUNCEMENTS: "announcements",
  REPORTS: "reports",
  USERS: "users",
  SETTINGS: "settings",
} as const;

// Full route paths (for navigation from other parts of app)
export const ADMIN_DASHBOARD_ROUTE = "/dashboard/admin";
export const ADMIN_OPPORTUNITIES_ROUTE = "/dashboard/admin/opportunities";
export const ADMIN_ADD_OPPORTUNITY_ROUTE = "/dashboard/admin/opportunities/add";
export const ADMIN_COMPANIES_ROUTE = "/dashboard/admin/companies";
export const ADMIN_OUTREACH_ROUTE = "/dashboard/admin/outreach";
export const ADMIN_HEADLINES_ROUTE = "/dashboard/admin/headlines";
export const ADMIN_STUDENTS_ANALYTICS_ROUTE = "/dashboard/admin/students-analytics";
export const ADMIN_COMPANY_ANALYTICS_ROUTE = "/dashboard/admin/company-analytics";
export const ADMIN_MOCK_INTERVIEWS_ROUTE = "/dashboard/admin/mock-interviews";
export const ADMIN_REVIEW_JOBS_ROUTE = "/dashboard/admin/review-jobs";
export const ADMIN_ALUMNI_ROUTE = "/dashboard/admin/alumni";
export const ADMIN_ANNOUNCEMENTS_ROUTE = "/dashboard/admin/announcements";
export const ADMIN_REPORTS_ROUTE = "/dashboard/admin/reports";
export const ADMIN_USERS_ROUTE = "/dashboard/admin/users";
export const ADMIN_SETTINGS_ROUTE = "/dashboard/admin/settings";

// Types
export interface Opportunity {
  id: string;
  companyName: string;
  roleTitle: string;
  type: "internship" | "full-time";
  requiredSkills: string[];
  eligibility: {
    branches: string[];
    minCgpa: number;
  };
  deadline: string;
  location: string;
  mode: "remote" | "on-site" | "hybrid";
  ctc: { min: number; max: number };
  source: "linkedin" | "internshala" | "manual" | "naukri" | "other";
  status: "pending" | "approved" | "rejected" | "closed";
  postedDate: string;
  description?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  location: string;
  hrContacts: HRContact[];
  lastContactedDate: string;
  contactStatus: "active" | "inactive";
  pastHiringHistory: HiringRecord[];
  averageCTC: number;
  notes: string;
}

export interface HRContact {
  name: string;
  email: string;
  phone: string;
  designation: string;
}

export interface HiringRecord {
  year: number;
  rolesOffered: string[];
  studentsHired: number;
  avgPackage: number;
}

export interface RecruiterOutreach {
  id: string;
  companyName: string;
  recruiterName: string;
  contactMode: "email" | "call" | "meeting";
  dateTime: string;
  summary: string;
  nextFollowUpDate: string;
  status: "responded" | "pending" | "follow-up";
  attachments?: string[];
}

export interface CompanyHeadline {
  id: string;
  companyName: string;
  headline: string;
  date: string;
  rolesOffered: string[];
  selectionRatio: number;
  gallery?: string[];
  announcement?: string;
}

export interface StudentAnalytics {
  totalRegistered: number;
  eligible: number;
  ineligible: number;
  branchWise: Record<string, number>;
  applicationPerStudent: number;
  interviewSuccessRate: number;
  placementReadinessScore: number;
}

export interface CompanyAnalytics {
  companiesContacted: number;
  companiesResponded: number;
  conversionRate: number;
  avgHiringCycleTime: number;
  companyWisePlacements: Record<string, number>;
  domainWiseTrends: Record<string, number>;
  returningRecruiters: number;
  newRecruiters: number;
}

export interface MockInterviewRecord {
  id: string;
  studentName: string;
  studentId: string;
  interviewType: "hr" | "technical" | "role-specific";
  status: "scheduled" | "completed" | "cancelled";
  scheduledDate: string;
  aiScore?: number;
  communicationScore?: number;
  technicalScore?: number;
  resumeScore?: number;
  suggestions?: string[];
}

export interface AlumniRecord {
  id: string;
  name: string;
  graduationYear: number;
  company: string;
  role: string;
  email: string;
  phone?: string;
  willingToRefer: boolean;
  pastReferrals: number;
  engagementStatus: "active" | "inactive";
}

export interface Announcement {
  id: string;
  type: "job" | "drive" | "result" | "training" | "notice";
  title: string;
  content: string;
  attachments?: string[];
  targetAudience: string[];
  publishDate: string;
  expiryDate: string;
  status: "draft" | "published" | "expired";
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  role: "super_admin" | "admin" | "coordinator" | "viewer";
  permissions: string[];
  lastLogin?: string;
  lastActive: string;
  status: "active" | "inactive";
}

export interface ReviewJob {
  id: string;
  submittedBy: string;
  submitterType: "alumni" | "faculty" | "external";
  opportunityDetails: Partial<Opportunity>;
  credibilityScore: number;
  verificationStatus: "pending" | "verified" | "rejected";
  adminNotes?: string;
}
