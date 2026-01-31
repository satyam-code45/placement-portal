import { Bookmark } from "lucide-react"; 
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; 
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, DollarSign, BookmarkCheck } from "lucide-react";
import { AppLayout } from "../component/layout";
import { useSavedJobs } from "../hooks/useJobs";
import { STUDENT_JOBS_ROUTE } from "../types/common";

export default function SavedJobsPage() {
  const { savedJobsWithDetails, isLoading, unsaveJob } = useSavedJobs();

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
        {isLoading ? (
          Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />)
        ) : savedJobsWithDetails.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No saved jobs yet. Browse jobs and save ones you're interested in!</p>
              <Button asChild className="mt-4"><Link to={`${STUDENT_JOBS_ROUTE}/`}>Browse Jobs</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {savedJobsWithDetails.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link to={`${STUDENT_JOBS_ROUTE}/${job.id}`} className="font-semibold text-lg hover:text-primary">{job.title}</Link>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                        <Building2 className="h-4 w-4" /><span>{job.company.name}</span>
                        <span className="text-border">•</span>
                        <MapPin className="h-4 w-4" /><span>{job.location}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">{job.type === "internship" ? "Internship" : "Full-time"}</Badge>
                        <Badge variant="secondary"><DollarSign className="h-3 w-3" />${(job.salary.min/1000).toFixed(0)}k-${(job.salary.max/1000).toFixed(0)}k</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => unsaveJob(job.id)} className="text-primary">
                      <BookmarkCheck className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}