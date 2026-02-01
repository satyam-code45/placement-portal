import api from "./api";

export interface JobIntelligence {
  id: number;
  title: string;
  companyName: string;
  location: string | null;
  jobType: string | null;
  source: string;
  applyLink: string;
  finalScore: number;
  scoreBreakdown: unknown;
  description: string | null;
  runId: number;
  createdAt: string;
}

export interface StudentJobIntelligence extends Omit<JobIntelligence, "applyLink"> {
  applyLink: string | null;
  approved: boolean;
  approvedAt: string | null;
}

export interface JobIntelligenceRun {
  id: number;
  runType: string;
  totalJobs: number;
  createdAt: string;
  jobs: JobIntelligence[];
}

export interface GetLatestJobsResponse {
  jobs: JobIntelligence[];
  runId: number;
  runCreatedAt: string;
  totalJobs: number;
}

export interface GetLatestJobsForStudentResponse {
  jobs: StudentJobIntelligence[];
  runId: number;
  runCreatedAt: string;
  totalJobs: number;
}

export interface GetJobsByRunIdResponse {
  jobs: JobIntelligence[];
  runId: number;
  runCreatedAt: string;
  totalJobs: number;
  runType: string;
}

const BACKEND_INTERNAL_TOKEN =
  import.meta.env.VITE_BACKEND_INTERNAL_TOKEN || "";

class JobIntelligenceService {
  /**
   * Get the latest job intelligence run with all jobs
   */
  async getLatestJobs(): Promise<GetLatestJobsResponse> {
    const response = await api.get<GetLatestJobsResponse>(
      "/internal/job-intelligence/latest",
      {
        headers: {
          Authorization: `Bearer ${BACKEND_INTERNAL_TOKEN}`,
        },
      },
    );
    return response.data;
  }

  /**
   * Student-facing: latest jobs + approval per job (no internal token)
   */
  async getLatestJobsForStudent(): Promise<GetLatestJobsForStudentResponse> {
    const response = await api.get<GetLatestJobsForStudentResponse>(
      "/job-intelligence/latest",
    );
    return response.data;
  }

  /**
   * Get jobs by specific run ID
   */
  async getJobsByRunId(runId: number): Promise<GetJobsByRunIdResponse> {
    const response = await api.get<GetJobsByRunIdResponse>(
      `/internal/job-intelligence/run/${runId}`,
      {
        headers: {
          Authorization: `Bearer ${BACKEND_INTERNAL_TOKEN}`,
        },
      },
    );
    return response.data;
  }
}

export const jobIntelligenceService = new JobIntelligenceService();
