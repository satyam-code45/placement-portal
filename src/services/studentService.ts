import api from "@/services/api";

export interface UpdateStudentProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  rollNo?: string;
  graduationYear?: number;
  skills?: string[];
  portfolioUrl?: string;
  linkedinUrl?: string;
  activeBacklogs?: boolean;
}

export interface StudentProfileResponse {
  success: boolean;
  student: any;
}

class StudentService {
  async updateProfile(
    data: UpdateStudentProfileData,
  ): Promise<StudentProfileResponse> {
    const response = await api.put<StudentProfileResponse>(
      "/student/profile",
      data,
    );
    return response.data;
  }

  async getProfile(): Promise<StudentProfileResponse> {
    const response = await api.get<StudentProfileResponse>("/student/profile");
    return response.data;
  }
}

export const studentService = new StudentService();
