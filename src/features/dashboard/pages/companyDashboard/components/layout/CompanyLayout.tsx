import type { ReactNode } from "react";
import { CompanySidebar } from "./CompanySidebar";
import { CompanyHeader } from "./CompanyHeader";

import { cn } from "@/lib/utils";
import { useCompanyStore } from "../../store/companyStore";

interface CompanyLayoutProps {
  children: ReactNode;
}

export function CompanyLayout({ children }: CompanyLayoutProps) {
  const sidebarOpen = useCompanyStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-3 lg:p-4">
      <div className="h-[calc(100vh-1.5rem)] lg:h-[calc(100vh-2rem)] flex gap-3 lg:gap-4">
        {/* Container 1: Sidebar (rounded) */}
        <aside
          className={cn(
            "bg-gray-900 rounded-2xl shadow-lg border border-gray-800 transition-all duration-300 flex-shrink-0",
            sidebarOpen ? "w-[16rem]" : "w-[4.5rem]",
          )}
        >
          <CompanySidebar />
        </aside>

        {/* Right side content */}
        <div className="flex-1 flex flex-col gap-3 lg:gap-4 min-w-0">
          {/* Container 2: Header (rounded) */}
          <CompanyHeader />

          {/* Container 3: Main Content (rounded) */}
          <main className="flex-1 bg-white rounded-2xl shadow-lg border p-5 md:p-6 lg:p-8 overflow-y-auto scrollbar-hide">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
