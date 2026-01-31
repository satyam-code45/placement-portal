import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setAdmin: (admin) => set({ admin }),
      logout: () => set({ admin: null }),
    }),
    {
      name: "admin-storage",
    }
  )
);
