// ============ Student Types ============
export interface Student {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  college: string;
  course: string;
  branch: string;
  batch: number;
  rollNumber: string;
  cgpa: number;
  subjects: string[];
  skills: string[];
  hasBacklogs: boolean;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resume {
  id: string;
  studentId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
  updatedAt: string;
}

export interface ResumeCompletenessCheck {
  score: number;
  suggestions: string[];
  missingFields: string[];
}

// ============ Company Types ============
export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  website: string;
  description: string;
  headquarters: string;
}

// ============ Job Types ============
export type JobType = "full-time" | "internship" | "contract";
export type EligibilityStatus = "eligible" | "partially-eligible" | "not-eligible";

export interface Job {
  id: string;
  companyId: string;
  company: Company;
  title: string;
  description: string;
  type: JobType;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  eligibility: {
    minCgpa: number;
    branches: string[];
    batches: number[];
    skills: string[];
    noBacklogs: boolean;
  };
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline: string;
  postedAt: string;
  isActive: boolean;
}

export interface JobWithEligibility extends Job {
  eligibilityStatus: EligibilityStatus;
  eligibilityReasons: string[];
}

// ============ Application Types ============
export type ApplicationStatus = 
  | "applied" 
  | "shortlisted" 
  | "interview" 
  | "selected" 
  | "rejected";

export interface Application {
  id: string;
  studentId: string;
  jobId: string;
  job: Job;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  statusHistory: {
    status: ApplicationStatus;
    timestamp: string;
    note?: string;
  }[];
}

// ============ Saved Jobs Types ============
export interface SavedJob {
  id: string;
  studentId: string;
  jobId: string;
  savedAt: string;
}

// ============ Dashboard Types ============
export interface DashboardStats {
  profileCompletion: number;
  appliedCount: number;
  shortlistedCount: number;
  interviewCount: number;
  selectedCount: number;
  rejectedCount: number;
  savedJobsCount: number;
}

// ============ Filter Types ============
export interface JobFilters {
  search: string;
  company: string;
  location: string;
  type: JobType | "";
  minSalary: number;
  eligibilityStatus: EligibilityStatus | "";
}

export interface ApplicationFilters {
  status: ApplicationStatus | "";
  search: string;
}

// ============ Auth Types ============
export interface AuthState {
  isAuthenticated: boolean;
  student: Student | null;
}

// ============ UI Types ============
export interface ModalState {
  isOpen: boolean;
  type: "apply" | "confirm" | "success" | null;
  data?: Record<string, unknown>;
}