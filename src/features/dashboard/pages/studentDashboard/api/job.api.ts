import { mockApiCall, generateId } from "./client";
import { mockJobs, mockSavedJobs, mockStudent } from "./mockData";
import type { Job, JobWithEligibility, SavedJob, EligibilityStatus, JobFilters } from  "../types"

// In-memory storage for saved jobs
let savedJobsData = [...mockSavedJobs];

// Calculate eligibility status for a job
function calculateEligibility(job: Job, student: typeof mockStudent): { status: EligibilityStatus; reasons: string[] } {
  const reasons: string[] = [];
  let eligible = true;
  let partiallyEligible = false;

  // Check CGPA
  if (student.cgpa < job.eligibility.minCgpa) {
    reasons.push(`CGPA ${student.cgpa} is below minimum ${job.eligibility.minCgpa}`);
    eligible = false;
  }

  // Check branch
  if (!job.eligibility.branches.includes(student.branch)) {
    reasons.push(`${student.branch} is not in eligible branches`);
    eligible = false;
  }

  // Check batch
  if (!job.eligibility.batches.includes(student.batch)) {
    reasons.push(`Batch ${student.batch} is not eligible`);
    eligible = false;
  }

  // Check backlogs
  if (job.eligibility.noBacklogs && student.hasBacklogs) {
    reasons.push("No backlogs required");
    eligible = false;
  }

  // Check skills (partial match is okay)
  const matchedSkills = job.eligibility.skills.filter(skill => 
    student.skills.some(s => s.toLowerCase() === skill.toLowerCase())
  );
  
  if (matchedSkills.length === 0 && job.eligibility.skills.length > 0) {
    reasons.push("Missing required skills: " + job.eligibility.skills.join(", "));
    partiallyEligible = true;
  } else if (matchedSkills.length < job.eligibility.skills.length) {
    const missingSkills = job.eligibility.skills.filter(skill => 
      !student.skills.some(s => s.toLowerCase() === skill.toLowerCase())
    );
    reasons.push("Missing some skills: " + missingSkills.join(", "));
    partiallyEligible = true;
  }

  if (!eligible) {
    return { status: "not-eligible", reasons };
  }
  
  if (partiallyEligible) {
    return { status: "partially-eligible", reasons };
  }

  return { status: "eligible", reasons: ["You meet all eligibility criteria!"] };
}

export const jobApi = {
  // Get all jobs with eligibility
  getJobs: async (filters?: JobFilters): Promise<JobWithEligibility[]> => {
    let jobs = mockJobs.filter(job => job.isActive);

    // Apply filters
    if (filters) {
      if (filters.search) {
        const search = filters.search.toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(search) ||
          job.company.name.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search)
        );
      }

      if (filters.company) {
        jobs = jobs.filter(job => job.company.name === filters.company);
      }

      if (filters.location) {
        jobs = jobs.filter(job => job.location.includes(filters.location));
      }

      if (filters.type) {
        jobs = jobs.filter(job => job.type === filters.type);
      }

      if (filters.minSalary > 0) {
        jobs = jobs.filter(job => job.salary.max >= filters.minSalary);
      }
    }

    // Add eligibility status
    const jobsWithEligibility: JobWithEligibility[] = jobs.map(job => {
      const { status, reasons } = calculateEligibility(job, mockStudent);
      return {
        ...job,
        eligibilityStatus: status,
        eligibilityReasons: reasons,
      };
    });

    // Filter by eligibility if specified
    if (filters?.eligibilityStatus) {
      return mockApiCall(jobsWithEligibility.filter(job => job.eligibilityStatus === filters.eligibilityStatus));
    }

    return mockApiCall(jobsWithEligibility);
  },

  // Get job by ID
  getJobById: async (id: string): Promise<JobWithEligibility | null> => {
    const job = mockJobs.find(j => j.id === id);
    if (!job) return mockApiCall(null);

    const { status, reasons } = calculateEligibility(job, mockStudent);
    return mockApiCall({
      ...job,
      eligibilityStatus: status,
      eligibilityReasons: reasons,
    });
  },

  // Get unique companies for filters
  getCompanies: async (): Promise<string[]> => {
    const companies = [...new Set(mockJobs.map(job => job.company.name))];
    return mockApiCall(companies);
  },

  // Get unique locations for filters
  getLocations: async (): Promise<string[]> => {
    const locations = [...new Set(mockJobs.map(job => job.location))];
    return mockApiCall(locations);
  },

  // Get saved jobs
  getSavedJobs: async (): Promise<SavedJob[]> => {
    return mockApiCall(savedJobsData);
  },

  // Save a job
  saveJob: async (jobId: string): Promise<SavedJob> => {
    const existing = savedJobsData.find(s => s.jobId === jobId);
    if (existing) return mockApiCall(existing);

    const newSaved: SavedJob = {
      id: generateId(),
      studentId: mockStudent.id,
      jobId,
      savedAt: new Date().toISOString(),
    };
    savedJobsData.push(newSaved);
    return mockApiCall(newSaved);
  },

  // Unsave a job
  unsaveJob: async (jobId: string): Promise<void> => {
    savedJobsData = savedJobsData.filter(s => s.jobId !== jobId);
    return mockApiCall(undefined);
  },

  // Check if job is saved
  isJobSaved: async (jobId: string): Promise<boolean> => {
    return mockApiCall(savedJobsData.some(s => s.jobId === jobId));
  },

  // Get saved jobs with full job details
  getSavedJobsWithDetails: async (): Promise<JobWithEligibility[]> => {
    const savedJobIds = savedJobsData.map(s => s.jobId);
    const jobs = mockJobs.filter(job => savedJobIds.includes(job.id));
    
    const jobsWithEligibility: JobWithEligibility[] = jobs.map(job => {
      const { status, reasons } = calculateEligibility(job, mockStudent);
      return {
        ...job,
        eligibilityStatus: status,
        eligibilityReasons: reasons,
      };
    });

    return mockApiCall(jobsWithEligibility);
  },
};