import api from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterStudentData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  rollNo?: string;
  collegeId?: number;
  graduationYear?: number;
  skills?: string[];
  portfolioUrl?: string;
  linkedinUrl?: string;
  activeBacklogs?: boolean;
}

export interface RegisterCompanyData {
  email: string;
  password: string;
  companyName: string;
  website?: string;
  industry?: string;
  description?: string;
  contactPersonName?: string;
  contactPersonDesignation?: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    role: "STUDENT" | "COMPANY" | "ADMIN" | "SUPERADMIN";
    name?: string;
    companyName?: string;
    enrollmentNumber?: string;
    department?: string;
    batch?: string;
    phoneNumber?: string;
  };
}

class AuthService {
  // Student Auth
  async studentRegister(data: RegisterStudentData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/student/register",
      data,
    );
    if (response.data.success) {
      this.saveAuthData(response.data);
    }
    return response.data;
  }

  async studentLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/student/login",
      credentials,
    );
    if (response.data.success) {
      if (!response.data.user.role) {
        response.data.user.role = "STUDENT";
      }
      this.saveAuthData(response.data);
    }
    return response.data;
  }

  // Company Auth
  async companyRegister(data: RegisterCompanyData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/company/register",
      data,
    );
    if (response.data.success) {
      this.saveAuthData(response.data);
    }
    return response.data;
  }

  async companyLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/company/login",
      credentials,
    );
    if (response.data.success) {
      if (!response.data.user.role) {
        response.data.user.role = "COMPANY";
      }
      this.saveAuthData(response.data);
    }
    return response.data;
  }

  // Admin Auth
  async adminLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/admin/login",
      credentials,
    );
    if (response.data.success) {
      if (!response.data.user.role) {
        response.data.user.role = "ADMIN";
      }
      this.saveAuthData(response.data);
    }
    return response.data;
  }

  // SuperAdmin Auth
  async superAdminLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/superadmin/login",
      credentials,
    );
    if (response.data.success) {
      if (!response.data.user.role) {
        response.data.user.role = "SUPERADMIN";
      }
      this.saveAuthData(response.data);
    }
    return response.data;
  }

  // Helper methods
  private saveAuthData(data: AuthResponse): void {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUser(): AuthResponse["user"] | null {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined" || user === "null") {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
