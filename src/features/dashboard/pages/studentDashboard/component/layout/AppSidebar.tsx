import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Brain,
  FileText,
  ClipboardList,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUIStore } from "../../store/uiStore";

/* ---------------- NAV ITEMS ---------------- */

const dashboardNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/student" },
  { icon: User, label: "Profile", path: "/dashboard/student/profile" },
  { icon: FileText, label: "Resume", path: "/dashboard/student/resume" },
  { icon: Briefcase, label: "Jobs", path: "/dashboard/student/jobs" },
  {
    icon: Brain,
    label: "Mock Interview",
    path: "/dashboard/student/mock-interview",
  },
  {
    icon: ClipboardList,
    label: "Applications",
    path: "/dashboard/student/applications",
  },
  {
    icon: Bookmark,
    label: "Saved Jobs",
    path: "/dashboard/student/saved-jobs",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();

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
          "bg-gray-900 rounded-r-3xl shadow-xl",
          "transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-xl font-extrabold text-white">
            CampusConnect
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Public Links */}
        <nav className="px-6 space-y-6">
          {dashboardNav.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={toggleSidebar}
              className="block text-lg font-medium text-gray-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden lg:flex flex-col h-full">
        {/* Logo Area */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            to="/dashboard/student"
            className="flex items-center gap-3 overflow-hidden min-w-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-600 text-white shadow-sm transition-transform hover:scale-105">
              <GraduationCap className="h-5 w-5" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold tracking-tight text-white truncate">
                CampusConnect
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto scrollbar-hide">
          {dashboardNav.map((item) => {
            const isActive = location.pathname === item.path;

            const NavItem = (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-yellow-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  !sidebarOpen && "justify-center px-0",
                )}
              >
                <item.icon
                  className={cn(
                    "shrink-0",
                    isActive ? "text-white" : "text-gray-300",
                    "h-5 w-5",
                  )}
                />

                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );

            return sidebarOpen ? (
              NavItem
            ) : (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 mt-auto border-t border-dashed border-gray-700">
            <p className="text-xs text-center text-gray-400">© 2026 PlaceHub</p>
          </div>
        )}
      </div>
    </>
  );
}
