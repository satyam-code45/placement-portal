import type { Resume, ResumeCompletenessCheck, Student } from "../types";
import { mockApiCall, generateId } from "./client";
import { mockStudent, mockResume } from "./mockData";
 

// In-memory storage for mock data mutations
let studentData = { ...mockStudent };
let resumeData = mockResume ? { ...mockResume } : null;

export const studentApi = {
  // Get student profile
  getProfile: async (): Promise<Student> => {
    return mockApiCall(studentData);
  },

  // Update student profile
  updateProfile: async (updates: Partial<Student>): Promise<Student> => {
    studentData = { ...studentData, ...updates, updatedAt: new Date().toISOString() };
    return mockApiCall(studentData);
  },

  // Get resume
  getResume: async (): Promise<Resume | null> => {
    return mockApiCall(resumeData);
  },

  // Upload resume (mock)
  uploadResume: async (file: File): Promise<Resume> => {
    const newResume: Resume = {
      id: generateId(),
      studentId: studentData.id,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    resumeData = newResume;
    return mockApiCall(newResume);
  },

  // Delete resume
  deleteResume: async (): Promise<void> => {
    resumeData = null;
    return mockApiCall(undefined);
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
      suggestions.push("Add at least 3 relevant skills to improve your profile visibility.");
    }

    if (studentData.subjects.length > 0) score++;
    else missingFields.push("Subjects");

    if (resumeData) score++;
    else {
      missingFields.push("Resume");
      suggestions.push("Upload your resume to apply for jobs.");
    }

    if (studentData.skills.length >= 5) score++;
    else suggestions.push("Consider adding more skills to match more job requirements.");

    // Generate suggestions based on profile
    if (studentData.cgpa < 7.5) {
      suggestions.push("Focus on projects and skills to compensate for CGPA requirements.");
    }

    if (!studentData.skills.includes("Git")) {
      suggestions.push("Add Git to your skills - it's required by most employers.");
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