import { Link } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  Users,
  Trophy,
  XCircle,
  Building2,
} from "lucide-react";
import { AppLayout } from "../component/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { useApplications } from "../hooks/useApplication";
import type { Application, ApplicationStatus } from "../types";
import { STUDENT_JOBS_ROUTE } from "../types/common";

const statusConfig: Record<
  ApplicationStatus,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    label: string;
  }
> = {
  applied: { icon: Clock, color: "bg-info/10 text-info", label: "Applied" },
  shortlisted: {
    icon: CheckCircle,
    color: "bg-success/10 text-success",
    label: "Shortlisted",
  },
  interview: {
    icon: Users,
    color: "bg-warning/10 text-warning",
    label: "Interview",
  },
  selected: {
    icon: Trophy,
    color: "bg-success/10 text-success",
    label: "Selected",
  },
  rejected: {
    icon: XCircle,
    color: "bg-destructive/10 text-destructive",
    label: "Rejected",
  },
};

function ApplicationCard({ application }: { application: Application }) {
  const config = statusConfig[application.status];
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link
              to={`${STUDENT_JOBS_ROUTE}/${application.jobId}`}
              className="font-semibold text-lg hover:text-primary"
            >
              {application.job.title}
            </Link>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
              <Building2 className="h-4 w-4" />
              <span>{application.job.company.name}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Applied {formatDistanceToNow(new Date(application.appliedAt))} ago
            </p>
          </div>
          <Badge className={config.color}>
            <config.icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ApplicationsPage() {
  const { data: applications, isLoading } = useApplications();

  const filterByStatus = (status?: ApplicationStatus) =>
    status ? applications?.filter((a) => a.status === status) : applications;

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
          </TabsList>
          {["all", "applied", "shortlisted", "interview"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="h-24" />)
              ) : filterByStatus(
                  tab === "all" ? undefined : (tab as ApplicationStatus),
                )?.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-muted-foreground">
                    No applications found.
                  </CardContent>
                </Card>
              ) : (
                filterByStatus(
                  tab === "all" ? undefined : (tab as ApplicationStatus),
                )?.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}
