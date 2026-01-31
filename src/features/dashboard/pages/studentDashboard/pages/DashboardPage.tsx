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
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
      <CardContent className="p-6 lg:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-4xl font-bold mt-2 text-gray-900">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>
          <div className={`rounded-xl p-3.5 ${variantStyles[variant]}`}>
            <Icon className="h-7 w-7" />
          </div>
        </div>
      </CardContent>
    </Card>
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
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-gradient-to-r from-primary/8 via-primary/12 to-transparent p-8 rounded-xl shadow-sm border border-primary/10 mb-6">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-gray-900">
              Welcome back, {student?.fullName?.split(" ")[0] || "Student"}!
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Here's an overview of your placement journey
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to={`${STUDENT_DASHBOARD_ROUTE}/jobs`}>
              <Briefcase className="mr-2 h-5 w-5" />
              Browse Jobs
            </Link>
          </Button>
        </div>

        {/* Profile Completion */}
        <Card className="border shadow-md bg-gradient-to-r from-white to-slate-50/50">
          <CardContent className="p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Profile Completion</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete your profile to improve visibility to recruiters
                </p>
                {profileLoading ? (
                  <Skeleton className="h-3 w-full" />
                ) : (
                  <div className="space-y-3">
                    <Progress value={profileCompletion || 0} className="h-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">
                        {profileCompletion || 0}% complete
                      </span>
                      {profileCompletion && profileCompletion < 100 && (
                        <Link
                          to={`${STUDENT_DASHBOARD_ROUTE}/profile`}
                          className="text-primary hover:underline font-medium"
                        >
                          Complete Profile →
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {resumeCheck && resumeCheck.score < 100 && (
                <div className="lg:w-72 p-5 rounded-xl bg-amber-50 border border-amber-200/50 shadow-sm">
                  <p className="text-sm font-semibold text-amber-700">
                    Resume Score: {resumeCheck.score}%
                  </p>
                  <p className="text-xs text-amber-600/80 mt-2">
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
          <Card className="border shadow-md">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl">Application Status</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
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
                  <div className="flex items-center justify-between p-3 rounded-lg bg-info/10">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-info" />
                      <span className="font-medium">Applied</span>
                    </div>
                    <Badge variant="secondary">
                      {stats?.appliedCount || 0}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <span className="font-medium">Selected</span>
                    </div>
                    <Badge variant="secondary">
                      {stats?.selectedCount || 0}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-warning" />
                      <span className="font-medium">Interview Scheduled</span>
                    </div>
                    <Badge variant="secondary">
                      {stats?.interviewCount || 0}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <span className="font-medium">Rejected</span>
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
          <Card className="border shadow-md">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl">Recently Posted Jobs</CardTitle>
              <CardDescription>Latest opportunities for you</CardDescription>
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
                      className="block p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{job.title}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {job.company.name}
                          </p>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {job.type === "internship" ? "Intern" : "FT"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
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
