import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";

interface AdminState {
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setAdmin: (admin: AdminState["admin"]) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      admin: {
        id: "admin-1",
        name: "Dr. Sharma",
        email: "tnp@college.edu",
        role: "TnP Coordinator",
      },
      sidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setAdmin: (admin) => set({ admin }),
      logout: async () => {
        await authService.logout();
        set({ admin: null });
      },
    }),
    {
      name: "admin-storage",
    },
  ),
);
