import api from "./api";

export type JobSource = "job_intelligence" | "job_posting";

export interface EligibleStudentsResponse {
  success: boolean;
  error?: string;
  message?: string;
  jobSource?: string;
  jobId?: number;
  job?: {
    sourceType: JobSource;
    id: number;
    title?: string;
    companyName?: string;
    jobType?: string | null;
    location?: string | null;
    source?: string;
    createdAt?: string;
    postedOn?: string;
    finalScore?: number | null;
    applyLink?: string | null;
    requiredSkills?: string[];
  } | null;
  total?: number;
  matches?: Array<{
    student: {
      id: number;
      firstName: string;
      lastName: string;
      name: string;
      email: string;
      skills: string[];
      isActive: boolean;
      isPlaced: boolean;
      resumeUrl?: string | null;
      linkedinUrl?: string | null;
      portfolioUrl?: string | null;
    };
    match: {
      id: number;
      runId: number;
      matchScore: number;
      skillMatchScore?: number | null;
      atsScore?: number | null;
      matchedSkills: string[];
      missingSkills: string[];
      reasoning: unknown;
      createdAt: string;
      approved?: boolean;
      approvedAt?: string | null;
    };
  }>;
}

export interface ApproveStudentForJobResponse {
  success: boolean;
  error?: string;
  message?: string;
  approval?: {
    id: number;
    studentId: number;
    jobSource: JobSource;
    jobId: number | null;
    approvedAt: string;
  };
}

class StudentJobMatchService {
  async getEligibleStudents(params: {
    jobSource: JobSource;
    jobId: number;
    limit?: number;
    maxScore?: number;
    approvedOnly?: boolean;
  }): Promise<EligibleStudentsResponse> {
    const response = await api.get<EligibleStudentsResponse>(
      "/student-matching/eligible-students",
      {
        params: {
          jobSource: params.jobSource,
          jobId: params.jobId,
          limit: params.limit,
          maxScore: params.maxScore,
          approvedOnly: params.approvedOnly,
        },
      },
    );
    return response.data;
  }

  async approveStudentForJob(params: {
    jobSource: JobSource;
    jobId: number;
    studentId: number;
  }): Promise<ApproveStudentForJobResponse> {
    const response = await api.post<ApproveStudentForJobResponse>(
      "/student-matching/approve",
      {
        jobSource: params.jobSource,
        jobId: params.jobId,
        studentId: params.studentId,
      },
    );
    return response.data;
  }
}

export const studentJobMatchService = new StudentJobMatchService();
