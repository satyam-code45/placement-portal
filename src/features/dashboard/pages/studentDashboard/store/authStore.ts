import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Student } from "../types";
import { mockStudent } from "../api/mockData";
 

interface AuthState {
  isAuthenticated: boolean;
  student: Student | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateStudent: (updates: Partial<Student>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      student: null,

      login: async (email: string, _password: string) => {
        // Mock login - in production this would call an API
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // For mock purposes, accept any email/password
        set({
          isAuthenticated: true,
          student: { ...mockStudent, email },
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          student: null,
        });
      },

      updateStudent: (updates: Partial<Student>) => {
        set((state) => ({
          student: state.student ? { ...state.student, ...updates } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);