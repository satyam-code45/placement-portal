import { create } from "zustand";
import { persist } from "zustand/middleware";


interface ModalData {
  jobId?: string;
  jobTitle?: string;
  companyName?: string;
  [key: string]: unknown;
}

interface UIState {
  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Application Modal
  applyModalOpen: boolean;
  applyModalData: ModalData | null;
  openApplyModal: (data: ModalData) => void;
  closeApplyModal: () => void;

  // Success Modal
  successModalOpen: boolean;
  successModalMessage: string;
  openSuccessModal: (message: string) => void;
  closeSuccessModal: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme
      theme: "light",
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { theme: newTheme };
        });
      },
      setTheme: (theme) => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ theme });
      },

      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Application Modal
      applyModalOpen: false,
      applyModalData: null,
      openApplyModal: (data) => set({ applyModalOpen: true, applyModalData: data }),
      closeApplyModal: () => set({ applyModalOpen: false, applyModalData: null }),

      // Success Modal
      successModalOpen: false,
      successModalMessage: "",
      openSuccessModal: (message) => set({ successModalOpen: true, successModalMessage: message }),
      closeSuccessModal: () => set({ successModalOpen: false, successModalMessage: "" }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);