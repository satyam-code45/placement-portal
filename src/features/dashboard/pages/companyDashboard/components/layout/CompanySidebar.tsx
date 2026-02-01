import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  BarChart3,
  Building2,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCompanyStore } from "../../store/companyStore";

/* ---------------- NAV ITEMS ---------------- */

const companyNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/company" },
  {
    icon: Briefcase,
    label: "Post New Job",
    path: "/dashboard/company/post-job",
  },
  { icon: FileText, label: "My Jobs", path: "/dashboard/company/my-jobs" },
  {
    icon: Users,
    label: "Applications",
    path: "/dashboard/company/applications",
  },
  {
    icon: Users,
    label: "Candidates",
    path: "/dashboard/company/candidates",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/dashboard/company/analytics",
  },
  {
    icon: Building2,
    label: "Company Profile",
    path: "/dashboard/company/profile",
  },
  { icon: Settings, label: "Settings", path: "/dashboard/company/settings" },
];

export function CompanySidebar() {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useCompanyStore();

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[90%] max-w-sm lg:hidden",
          "bg-gray-900 transform transition-transform duration-300 border-r border-gray-800",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-yellow-500" />
            <span className="font-bold text-white text-lg">Company Portal</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Nav */}
        <nav className="flex flex-col gap-1 p-3">
          {companyNav.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden lg:flex h-full flex-col">
        {/* Header */}
        <div
          className={cn(
            "flex items-center px-4 py-5 border-b border-gray-800",
            sidebarOpen ? "justify-between" : "justify-center",
          )}
        >
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-yellow-500" />
              <span className="font-bold text-white text-lg">Company</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white hover:bg-gray-800 shrink-0"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-1">
          {companyNav.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return sidebarOpen ? (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-yellow-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            ) : (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center justify-center h-12 w-12 mx-auto rounded-lg transition-colors",
                      isActive
                        ? "bg-yellow-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>
    </>
  );
}
