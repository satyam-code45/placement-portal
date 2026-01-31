import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

import { cn } from "@/lib/utils";
import { useUIStore } from "../../store/uiStore";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const sidebarOpen = useUIStore((state: any) => state.sidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-3 lg:p-4">
      <div className="h-[calc(100vh-1.5rem)] lg:h-[calc(100vh-2rem)] flex gap-3 lg:gap-4">
        {/* Container 1: Sidebar (rounded) */}
        <aside
          className={cn(
            "bg-white rounded-2xl shadow-lg border transition-all duration-300 flex-shrink-0",
            sidebarOpen ? "w-[19rem]" : "w-[4.5rem]",
          )}
        >
          <AppSidebar />
        </aside>

        {/* Right side content */}
        <div className="flex-1 flex flex-col gap-3 lg:gap-4">
          {/* Container 2: Header (rounded) */}
          <AppHeader />

          {/* Container 3: Main Content (rounded) */}
          <main className="flex-1 bg-white rounded-2xl shadow-lg border p-5 md:p-8 lg:p-10 overflow-y-auto scrollbar-hide">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
