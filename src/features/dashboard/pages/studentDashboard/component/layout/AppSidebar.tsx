import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  ClipboardList,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Brain,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useUIStore } from "../../store/uiStore";

/* ---------------- NAV ITEMS ---------------- */


const dashboardNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/student" },
  { icon: User, label: "Profile", path: "/dashboard/student/profile" },
  { icon: FileText, label: "Resume", path: "/dashboard/student/resume" },
  { icon: Briefcase, label: "Jobs", path: "/dashboard/student/jobs" },
  { icon: ClipboardList, label: "Applications", path: "/dashboard/student/applications" },
  { icon: Bookmark, label: "Saved Jobs", path: "/dashboard/student/saved-jobs" },
  { icon: Brain, label: "Mock Interview", path: "/dashboard/student/mock-interview" },
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
          "bg-white rounded-r-3xl shadow-xl",
          "transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-xl font-extrabold">CampusConnect</span>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
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
              className="block text-lg font-medium text-zinc-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>


      </aside>

      {/* ================= DESKTOP SIDEBAR (UNCHANGED) ================= */}

      <aside
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-full bg-white text-sidebar-foreground transition-all duration-300 lg:flex flex-col",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/dashboard/student" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-semibold tracking-tight">
                CampusConnect
              </span>
            )}
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Dashboard Nav */}
        <nav className="flex-1 space-y-1 p-3">
          {dashboardNav.map((item) => {
            const isActive = location.pathname === item.path;

            const NavItem = (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent"
                )}
              >
                <item.icon
                  className={cn(
                    "flex-shrink-0 transition-all duration-200",
                    sidebarOpen ? "h-5 w-5" : "h-5 w-5"
                  )}
                />

                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );

            return sidebarOpen ? (
              NavItem
            ) : (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        <div className="border-t p-4">
          {sidebarOpen && (
            <p className="text-xs text-sidebar-foreground/60">
              © 2024 PlaceHub
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
