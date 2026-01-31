import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Student } from "../types";

interface AuthState {
  isAuthenticated: boolean;
  student: Student | null;
  setStudent: (student: Student | null) => void;
  updateStudent: (updates: Partial<Student>) => void;
  clearStudent: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      student: null,

      setStudent: (student: Student | null) => {
        set({
          isAuthenticated: !!student,
          student,
        });
      },

      clearStudent: () => {
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
      name: "student-dashboard-storage",
    },
  ),
);
