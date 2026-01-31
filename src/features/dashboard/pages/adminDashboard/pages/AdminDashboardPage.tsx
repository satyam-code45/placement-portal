import {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Calendar,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AdminLayout } from "../components/layout";
import { mockDashboardStats } from "../api/mockData";
import { useAdminStore } from "../store/adminStore";

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "default",
}: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  trend?: { value: number; positive: boolean };
  variant?: "default" | "success" | "warning" | "info" | "destructive";
}) {
  const variantStyles = {
    default: "bg-gray-100 text-gray-900",
    success: "bg-gray-100 text-gray-900",
    warning: "bg-yellow-50 text-red-600",
    info: "bg-gray-100 text-gray-900",
    destructive: "bg-yellow-100 text-red-600",
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-200" />
      <div className="relative border-2 border-gray-900 rounded-2xl p-6 bg-white hover:shadow-xl transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {title}
            </p>
            <p className="text-4xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
            {trend && (
              <div
                className={`flex items-center gap-1.5 text-sm font-medium ${trend.positive ? "text-gray-900" : "text-red-600"}`}
              >
                <TrendingUp
                  className={`h-4 w-4 ${!trend.positive && "rotate-180"}`}
                />
                <span>{trend.value}% from last month</span>
              </div>
            )}
          </div>
          <div className={`rounded-full p-4 ${variantStyles[variant]}`}>
            <Icon className="h-7 w-7" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const admin = useAdminStore((state) => state.admin);
  const stats = mockDashboardStats;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gradient-to-r from-gray-50 via-gray-100 to-white p-6 rounded-xl border-2 border-gray-900">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl text-gray-900">
              Welcome back, {admin?.name?.split(" ")[0] || "Admin"}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with placements today
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-900"
            >
              <Link to="/dashboard/admin/opportunities/add">
                <Briefcase className="mr-2 h-4 w-4" />
                Add Opportunity
              </Link>
            </Button>
            <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
              <Link to="/dashboard/admin/announcements">
                <Bell className="mr-2 h-4 w-4" />
                New Announcement
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Jobs"
            value={stats.activeJobs}
            icon={Briefcase}
            variant="info"
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Companies"
            value={stats.totalCompanies}
            icon={Building2}
            variant="default"
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Students Registered"
            value={stats.registeredStudents}
            icon={Users}
            variant="success"
            description={`${stats.eligibleStudents} eligible`}
          />
          <StatCard
            title="Offers Made"
            value={stats.offersMade}
            icon={CheckCircle2}
            variant="success"
            description={`${stats.offersAccepted} accepted`}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Deadlines */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.upcomingDeadlines.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">{item.company}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(item.deadline).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2" asChild>
                <Link to="/dashboard/admin/opportunities">
                  View All Jobs
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Alerts & Notifications
                </CardTitle>
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <CardDescription>Requires attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border border-red-200"
                      : alert.type === "success"
                        ? "bg-gray-50 border border-gray-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div
                    className={`mt-0.5 ${
                      alert.type === "warning"
                        ? "text-red-600"
                        : alert.type === "success"
                          ? "text-gray-900"
                          : "text-gray-900"
                    }`}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : alert.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Bell className="h-4 w-4" />
                    )}
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Hiring Companies */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Top Hiring Companies</CardTitle>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>This placement season</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.topHiringCompanies.map((company, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{company.name}</span>
                    <span className="text-muted-foreground">
                      {company.hires} hires
                    </span>
                  </div>
                  <Progress
                    value={
                      (company.hires / stats.topHiringCompanies[0].hires) * 100
                    }
                    className="h-2"
                  />
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2" asChild>
                <Link to="/dashboard/admin/company-analytics">
                  View Analytics
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Placement Trend */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Placement Progress</CardTitle>
                <TrendingUp className="h-5 w-5 text-gray-900" />
              </div>
              <CardDescription>Monthly placement trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-40 gap-2">
                {stats.monthlyTrend.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div
                      className="w-full bg-yellow-600 rounded-t-md transition-all hover:bg-yellow-700"
                      style={{
                        height: `${(item.placements / 150) * 100}%`,
                        minHeight: "20px",
                      }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Placements</span>
                <span className="font-bold text-lg">
                  {stats.offersAccepted}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* In-Demand Skills */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">In-Demand Skills</CardTitle>
                <Badge variant="secondary">Top 5</Badge>
              </div>
              <CardDescription>Most requested by recruiters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.topSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium">{skill.skill}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {skill.demand}%
                    </span>
                  </div>
                  <Progress value={skill.demand} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">
                  Common tasks for placement management
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link to="/dashboard/admin/opportunities">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Manage Jobs
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/dashboard/admin/companies">
                    <Building2 className="mr-2 h-4 w-4" />
                    View Companies
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/dashboard/admin/students-analytics">
                    <Users className="mr-2 h-4 w-4" />
                    Student Analytics
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/dashboard/admin/reports">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Generate Report
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
