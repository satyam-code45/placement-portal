import {
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
  Bookmark,
  TrendingUp,
  Users,
  FileText,
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
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { useAuthStore } from "../store/authStore";
import { useDashboardStats, useRecentJobs } from "../hooks/useApplication";
import {
  useProfileCompletion,
  useResumeCompleteness,
} from "../hooks/useStudent";
import { AppLayout } from "../component/layout";
import { STUDENT_DASHBOARD_ROUTE } from "../types/common";

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  variant = "default",
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  variant?: "default" | "success" | "warning" | "info" | "destructive";
}) {
  const variantStyles = {
    default: "bg-gray-900 text-white",
    success: "bg-gray-900 text-white",
    warning: "bg-gray-900 text-white",
    info: "bg-gray-900 text-white",
    destructive: "bg-gray-900 text-white",
  };

  return (
    <div
      className="relative bg-[#ffba4b] rounded-2xl border-3 border-black overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:translate-y-[-4px]"
      style={{
        boxShadow: "8px 8px 0 rgba(0, 0, 0, 0.1)",
        transition:
          "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "16px 16px 0 rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.transform =
          "translateZ(20px) rotateX(5deg) rotateY(-5deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "8px 8px 0 rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "translateZ(0) rotateX(0) rotateY(0)";
      }}
    >
      {/* Shine effect */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/30 via-transparent to-transparent rotate-[-30deg] pointer-events-none" />

      {/* Top handle badge */}
      <div
        className={`absolute top-0 right-5 px-4 py-2 rounded-b-2xl border-2 border-t-0 border-black font-bold text-sm ${variantStyles[variant]} transition-all duration-300`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="p-6 pt-14">
        <div className="space-y-2">
          <p className="text-lg font-bold text-gray-900 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-4xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="text-sm text-gray-700 font-medium">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const student = useAuthStore((state: { student: any }) => state.student);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentJobs, isLoading: jobsLoading } = useRecentJobs(5);
  const { data: profileCompletion, isLoading: profileLoading } =
    useProfileCompletion();
  const { data: resumeCheck } = useResumeCompleteness();

  return (
    <AppLayout>
      <div className="space-y-10 animate-fade-in max-w-full">
        {/* Welcome Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-gradient-to-r from-gray-50 via-gray-100 to-white p-8 rounded-xl border-2 border-gray-900">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-gray-900">
              Welcome back, {student?.fullName?.split(" ")[0] || "Student"}!
            </h1>
            <p className="text-gray-600 mt-2 text-base">
              Here's an overview of your placement journey
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Link to={`${STUDENT_DASHBOARD_ROUTE}/jobs`}>
              <Briefcase className="mr-2 h-5 w-5" />
              Browse Jobs
            </Link>
          </Button>
        </div>

        {/* Profile Completion */}
        <Card className="border-2 border-gray-900 shadow-md bg-white rounded-2xl">
          <CardContent className="p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gray-900">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Profile Completion
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Complete your profile to improve visibility to recruiters
                </p>
                {profileLoading ? (
                  <Skeleton className="h-3 w-full" />
                ) : (
                  <div className="space-y-3">
                    <Progress value={profileCompletion || 0} className="h-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        {profileCompletion || 0}% complete
                      </span>
                      {profileCompletion && profileCompletion < 100 && (
                        <Link
                          to={`${STUDENT_DASHBOARD_ROUTE}/profile`}
                          className="text-yellow-600 hover:text-yellow-700 hover:underline font-medium"
                        >
                          Complete Profile →
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {resumeCheck && resumeCheck.score < 100 && (
                <div className="lg:w-72 p-5 rounded-xl bg-yellow-50 border-2 border-gray-900">
                  <p className="text-sm font-semibold text-gray-900">
                    Resume Score: {resumeCheck.score}%
                  </p>
                  <p className="text-xs text-gray-700 mt-2">
                    {resumeCheck.suggestions[0]}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statsLoading ? (
            Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              ))
          ) : (
            <>
              <StatCard
                title="Applied"
                value={stats?.appliedCount || 0}
                icon={Briefcase}
                variant="info"
              />
              <StatCard
                title="Shortlisted"
                value={stats?.shortlistedCount || 0}
                icon={TrendingUp}
                variant="success"
              />
              <StatCard
                title="Interviews"
                value={stats?.interviewCount || 0}
                icon={Users}
                variant="warning"
              />
              <StatCard
                title="Saved Jobs"
                value={stats?.savedJobsCount || 0}
                icon={Bookmark}
                variant="default"
              />
            </>
          )}
        </div>

        {/* Application Status Summary */}
        <div className="grid gap-8 xl:grid-cols-2">
          <Card className="border-2 border-gray-900 shadow-md rounded-2xl bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl text-gray-900">
                Application Status
              </CardTitle>
              <CardDescription className="text-gray-600">
                Track your job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="space-y-3">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 border border-gray-300">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-900" />
                      <span className="font-medium text-gray-900">Applied</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gray-900 text-white"
                    >
                      {stats?.appliedCount || 0}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 border border-gray-300">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-gray-900" />
                      <span className="font-medium text-gray-900">
                        Selected
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gray-900 text-white"
                    >
                      {stats?.selectedCount || 0}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 border border-gray-300">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-900" />
                      <span className="font-medium text-gray-900">
                        Interview Scheduled
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gray-900 text-white"
                    >
                      {stats?.interviewCount || 0}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-300">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-600">Rejected</span>
                    </div>
                    <Badge variant="secondary">
                      {stats?.rejectedCount || 0}
                    </Badge>
                  </div>
                </div>
              )}
              <Button variant="outline" className="w-full mt-5" asChild>
                <Link to={`${STUDENT_DASHBOARD_ROUTE}/applications`}>
                  View All Applications
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Jobs */}
          <Card className="border-2 border-gray-900 shadow-md rounded-2xl bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl text-gray-900">
                Recently Posted Jobs
              </CardTitle>
              <CardDescription className="text-gray-600">
                Latest opportunities for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              {jobsLoading ? (
                <div className="space-y-3">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {recentJobs?.map((job) => (
                    <Link
                      key={job.id}
                      to={`${STUDENT_DASHBOARD_ROUTE}/jobs/${job.id}`}
                      className="block p-3 rounded-lg border-2 border-gray-900 hover:bg-gray-50 transition-all hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate text-gray-900">
                            {job.title}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {job.company.name}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="shrink-0 border-gray-900 text-gray-900"
                        >
                          {job.type === "internship" ? "Intern" : "FT"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Posted {formatDistanceToNow(new Date(job.postedAt))} ago
                      </p>
                    </Link>
                  ))}
                </div>
              )}
              <Button variant="outline" className="w-full mt-5" asChild>
                <Link to={`${STUDENT_DASHBOARD_ROUTE}/jobs`}>
                  View All Jobs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
