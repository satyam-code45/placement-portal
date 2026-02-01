import axios from "axios";

const ORCHESTRATOR_BASE_URL =
  import.meta.env.VITE_ORCHESTRATOR_URL || "http://localhost:8001";

export interface StudentJobMatchRequest {
  studentId: number;
  topK?: number;
  jobsLimit?: number;
}

export interface StudentJobMatchResponse {
  success: boolean;
  error?: string | null;
  student?: {
    id?: number;
    email?: string;
    name?: string;
    skills?: string[];
    atsScore?: number;
  };
  matches?: Array<{
    jobId?: number | string;
    title?: string;
    company?: string;
    location?: string | null;
    jobType?: string | null;
    score?: number;
    reasoning?: any;
    skill?: {
      score?: number;
      matched?: string[];
      missing?: string[];
    };
  }>;
  persisted?: {
    matchRunId?: number;
    savedMatches?: number;
    jobIntelligenceRunId?: number;
  };
}

export interface BatchStudentMatchRequest {
  student_ids?: number[];
}

class StudentMatchingService {
  /**
   * Match a single student with jobs based on their skillset
   */
  async matchStudent(studentId: number): Promise<StudentJobMatchResponse> {
    try {
      const response = await axios.post<StudentJobMatchResponse>(
        `${ORCHESTRATOR_BASE_URL}/run/student-matching`,
        { studentId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 60000, // 60 second timeout
        },
      );
      return response.data;
    } catch (error) {
      console.error("Student matching error:", error);
      throw error;
    }
  }

  /**
   * Match multiple students with jobs
   */
  async matchMultipleStudents(studentIds: number[]): Promise<any> {
    try {
      const results = await Promise.all(
        studentIds.map((id) => this.matchStudent(id)),
      );
      return results;
    } catch (error) {
      console.error("Batch matching error:", error);
      throw error;
    }
  }
}

export const studentMatchingService = new StudentMatchingService();
