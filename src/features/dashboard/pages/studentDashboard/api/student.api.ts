import type { Resume, ResumeCompletenessCheck, Student } from "../types";
import { mockApiCall } from "./client";
import { mockStudent } from "./mockData";
import api from "@/services/api";

export const studentApi = {
  // Get student profile
  getProfile: async (): Promise<Student> => {
    return mockApiCall(mockStudent);
  },

  // Update student profile
  updateProfile: async (updates: Partial<Student>): Promise<Student> => {
    return mockApiCall({ ...mockStudent, ...updates });
  },

  // Get resume
  getResume: async (): Promise<Resume | null> => {
    try {
      const response = await api.get<{
        success: boolean;
        resume: Resume | null;
      }>("/student/resume");
      return response.data.resume;
    } catch {
      return null;
    }
  },

  // Upload resume
  uploadResume: async (file: File): Promise<Resume> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<{ success: boolean; resume: Resume }>(
      "/auth/student/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.resume;
  },

  // Delete resume
  deleteResume: async (): Promise<void> => {
    await api.delete("/student/resume");
  },

  // Check resume completeness based on profile
  checkResumeCompleteness: async (): Promise<ResumeCompletenessCheck> => {
    const missingFields: string[] = [];
    const suggestions: string[] = [];
    let score = 0;
    const totalFields = 10;

    // Check required fields
    if (studentData.fullName) score++;
    else missingFields.push("Full Name");

    if (studentData.email) score++;
    else missingFields.push("Email");

    if (studentData.phone) score++;
    else missingFields.push("Phone");

    if (studentData.college) score++;
    else missingFields.push("College");

    if (studentData.course && studentData.branch) score++;
    else missingFields.push("Course/Branch");

    if (studentData.cgpa > 0) score++;
    else missingFields.push("CGPA");

    if (studentData.skills.length >= 3) score++;
    else {
      missingFields.push("Skills (minimum 3)");
      suggestions.push(
        "Add at least 3 relevant skills to improve your profile visibility.",
      );
    }

    if (studentData.subjects.length > 0) score++;
    else missingFields.push("Subjects");

    if (resumeData) score++;
    else {
      missingFields.push("Resume");
      suggestions.push("Upload your resume to apply for jobs.");
    }

    if (studentData.skills.length >= 5) score++;
    else
      suggestions.push(
        "Consider adding more skills to match more job requirements.",
      );

    // Generate suggestions based on profile
    if (studentData.cgpa < 7.5) {
      suggestions.push(
        "Focus on projects and skills to compensate for CGPA requirements.",
      );
    }

    if (!studentData.skills.includes("Git")) {
      suggestions.push(
        "Add Git to your skills - it's required by most employers.",
      );
    }

    return mockApiCall({
      score: Math.round((score / totalFields) * 100),
      suggestions,
      missingFields,
    });
  },

  // Calculate profile completion percentage
  getProfileCompletion: async (): Promise<number> => {
    let completed = 0;
    const total = 11;

    if (studentData.fullName) completed++;
    if (studentData.email) completed++;
    if (studentData.phone) completed++;
    if (studentData.college) completed++;
    if (studentData.course) completed++;
    if (studentData.branch) completed++;
    if (studentData.batch) completed++;
    if (studentData.rollNumber) completed++;
    if (studentData.cgpa > 0) completed++;
    if (studentData.skills.length > 0) completed++;
    if (studentData.subjects.length > 0) completed++;

    return mockApiCall(Math.round((completed / total) * 100));
  },



  
};
