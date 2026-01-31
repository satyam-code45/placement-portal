import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  MessageSquare,
  Newspaper,
  Users,
  BarChart3,
  Brain,
  ClipboardCheck,
  GraduationCap,
  Megaphone,
  FileBarChart,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdminStore } from "../../store/adminStore";

/* ---------------- NAV ITEMS ---------------- */

const adminNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/admin" },
  {
    icon: Briefcase,
    label: "Opportunities",
    path: "/dashboard/admin/opportunities",
  },
  { icon: Building2, label: "Companies", path: "/dashboard/admin/companies" },
  {
    icon: MessageSquare,
    label: "Recruiter Outreach",
    path: "/dashboard/admin/outreach",
  },
  {
    icon: Newspaper,
    label: "Company Headlines",
    path: "/dashboard/admin/headlines",
  },
  {
    icon: Users,
    label: "Students Analytics",
    path: "/dashboard/admin/students-analytics",
  },
  {
    icon: BarChart3,
    label: "Company Analytics",
    path: "/dashboard/admin/company-analytics",
  },
  {
    icon: Brain,
    label: "Mock Interviews",
    path: "/dashboard/admin/mock-interviews",
  },
  {
    icon: ClipboardCheck,
    label: "Review Jobs",
    path: "/dashboard/admin/review-jobs",
  },
  { icon: GraduationCap, label: "Alumni", path: "/dashboard/admin/alumni" },
  {
    icon: Megaphone,
    label: "Announcements",
    path: "/dashboard/admin/announcements",
  },
  { icon: FileBarChart, label: "Reports", path: "/dashboard/admin/reports" },
  { icon: UserCog, label: "Users & Roles", path: "/dashboard/admin/users" },
  { icon: Settings, label: "Settings", path: "/dashboard/admin/settings" },
];

export function AdminSidebar() {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useAdminStore();

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
          <span className="text-xl font-extrabold text-white">TnP Admin</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav Links */}
        <nav className="px-4 space-y-1 overflow-y-auto max-h-[calc(100vh-100px)]">
          {adminNav.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={toggleSidebar}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-yellow-600 text-white"
                  : "text-gray-300 hover:bg-gray-800",
              )}
            >
              <item.icon className="h-5 w-5" />
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
            to="/dashboard/admin"
            className="flex items-center gap-3 overflow-hidden min-w-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-600 text-white shadow-sm transition-transform hover:scale-105">
              <Shield className="h-5 w-5" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold tracking-tight text-white truncate">
                TnP Admin
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white hover:bg-transparent"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto scrollbar-hide">
          {adminNav.map((item) => {
            const isActive = location.pathname === item.path;

            const NavItem = (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-yellow-600 text-white shadow-sm"
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
            <p className="text-xs text-center text-gray-400">
              © 2026 TnP Portal
            </p>
          </div>
        )}
      </div>
    </>
  );
}
