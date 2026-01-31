import { mockApiCall, generateId } from "./client";
import { mockApplications, mockJobs, mockStudent } from "./mockData";
import type { Application, ApplicationStatus, DashboardStats } from "../types"

// In-memory storage for applications
let applicationsData = [...mockApplications];

export const applicationApi = {
  // Get all applications
  getApplications: async (): Promise<Application[]> => {
    return mockApiCall(applicationsData);
  },

  // Get application by ID
  getApplicationById: async (id: string): Promise<Application | null> => {
    const application = applicationsData.find(a => a.id === id);
    return mockApiCall(application || null);
  },

  // Get applications by status
  getApplicationsByStatus: async (status: ApplicationStatus): Promise<Application[]> => {
    return mockApiCall(applicationsData.filter(a => a.status === status));
  },

  // Apply to a job
  applyToJob: async (jobId: string): Promise<Application> => {
    // Check if already applied
    const existing = applicationsData.find(a => a.jobId === jobId);
    if (existing) {
      throw new Error("You have already applied to this job");
    }

    const job = mockJobs.find(j => j.id === jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    const newApplication: Application = {
      id: generateId(),
      studentId: mockStudent.id,
      jobId,
      job,
      status: "applied",
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [
        {
          status: "applied",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    applicationsData.push(newApplication);
    return mockApiCall(newApplication);
  },

  // Check if already applied
  hasApplied: async (jobId: string): Promise<boolean> => {
    return mockApiCall(applicationsData.some(a => a.jobId === jobId));
  },

  // Get dashboard stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const stats: DashboardStats = {
      profileCompletion: 85, // Will be calculated from student profile
      appliedCount: applicationsData.filter(a => a.status === "applied").length,
      shortlistedCount: applicationsData.filter(a => a.status === "shortlisted").length,
      interviewCount: applicationsData.filter(a => a.status === "interview").length,
      selectedCount: applicationsData.filter(a => a.status === "selected").length,
      rejectedCount: applicationsData.filter(a => a.status === "rejected").length,
      savedJobsCount: 2, // From saved jobs
    };

    return mockApiCall(stats);
  },

  // Get recently posted jobs (for dashboard)
  getRecentJobs: async (limit = 5): Promise<typeof mockJobs> => {
    const recentJobs = [...mockJobs]
      .filter(job => job.isActive)
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
      .slice(0, limit);
    
    return mockApiCall(recentJobs);
  },
};