import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import type { Student } from "../types";

/**
 * Hook to sync global auth context with student dashboard store
 * Maps the backend user data to the Student interface
 */
export function useSyncAuth() {
  const { user, isAuthenticated } = useAuth();
  const { setStudent, clearStudent } = useAuthStore();

  useEffect(() => {
    console.log("useSyncAuth - user:", user);
    console.log("useSyncAuth - isAuthenticated:", isAuthenticated);

    if (isAuthenticated && user && user.role === "STUDENT") {
      // Map backend user data to Student type
      const studentData: Student = {
        id: user.id.toString(),
        email: user.email,
        fullName:
          `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Student",
        phone: user.phone || "",
        college: user.collegeId?.toString() || "Unknown College",
        course: "Computer Science", // Default - update when backend provides this
        branch: "CSE", // Default - update when backend provides this
        batch: user.graduationYear || new Date().getFullYear(),
        rollNumber: user.rollNo || "",
        cgpa: 0, // Default - update when backend provides this
        subjects: [],
        skills: user.skills || [],
        hasBacklogs: user.activeBacklogs || false,
        profilePicture: undefined,
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: user.createdAt || new Date().toISOString(),
      };

      console.log("Setting student data:", studentData);
      setStudent(studentData);
    } else {
      console.log("Clearing student data");
      clearStudent();
    }
  }, [user, isAuthenticated, setStudent, clearStudent]);
}
