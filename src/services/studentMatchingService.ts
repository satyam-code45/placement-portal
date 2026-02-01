import axios from "axios";

const ORCHESTRATOR_BASE_URL =
  import.meta.env.VITE_ORCHESTRATOR_URL || "http://localhost:8000";

export interface StudentJobMatchRequest {
  student_id: number;
}

export interface StudentJobMatchResponse {
  success: boolean;
  student?: any;
  jobs_count?: number;
  matched_jobs?: any[];
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
        `${ORCHESTRATOR_BASE_URL}/run/student-job-match`,
        { student_id: studentId },
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
