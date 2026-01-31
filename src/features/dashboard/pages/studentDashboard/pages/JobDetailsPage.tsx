import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, DollarSign, Building2, Calendar, Bookmark, BookmarkCheck, CheckCircle, AlertCircle, XCircle } from "lucide-react";
 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useIsJobSaved, useJobById, useSavedJobs } from "../hooks/useJobs";
import { useApplyToJob, useHasApplied } from "../hooks/useApplication";
import { useUIStore } from "../store/uiStore";
import { AppLayout } from "../component/layout";
import { toast } from "sonner";
import { format } from "date-fns/format";
import { STUDENT_DASHBOARD_ROUTE } from "../types/common";

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading } = useJobById(id || "");
  const { data: hasApplied } = useHasApplied(id || "");
  const { data: isSaved } = useIsJobSaved(id || "");
  const { saveJob, unsaveJob } = useSavedJobs();
  const applyMutation = useApplyToJob();
  const { applyModalOpen, closeApplyModal, openApplyModal } = useUIStore();

  const handleApply = () => {
    if (!id) return;
    applyMutation.mutate(id, {
      onSuccess: () => {
        closeApplyModal();
        toast.success("Application Submitted!", { description: `You have successfully applied to ${job?.title}` });
      },
      onError: (error) => {
        toast.error("Error", { description: error?.message ?? "An error occurred" });
      },
    });
  };

  if (isLoading) {
    return <AppLayout><div className="max-w-4xl space-y-6"><Skeleton className="h-10 w-48" /><Skeleton className="h-96" /></div></AppLayout>;
  }

  if (!job) {
    return <AppLayout><Card><CardContent className="p-12 text-center">Job not found</CardContent></Card></AppLayout>;
  }

  const eligibilityBadge = {
    "eligible": { icon: CheckCircle, label: "You're Eligible", class: "bg-success/10 text-success border-success/20" },
    "partially-eligible": { icon: AlertCircle, label: "Partial Match", class: "bg-warning/10 text-warning border-warning/20" },
    "not-eligible": { icon: XCircle, label: "Not Eligible", class: "bg-destructive/10 text-destructive border-destructive/20" },
  }[job.eligibilityStatus];

  return (
    <AppLayout>
      <div className="max-w-4xl space-y-6 animate-fade-in">
        <Button variant="ghost" asChild><Link to={`${STUDENT_DASHBOARD_ROUTE}/jobs`}><ArrowLeft className="mr-2 h-4 w-4" />Back to Jobs</Link></Button>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{job.company.name}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />${(job.salary.min/1000).toFixed(0)}k - ${(job.salary.max/1000).toFixed(0)}k</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline">{job.type === "internship" ? "Internship" : "Full-time"}</Badge>
                  <Badge variant="outline" className={eligibilityBadge.class}><eligibilityBadge.icon className="h-3 w-3 mr-1" />{eligibilityBadge.label}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => isSaved ? unsaveJob(job.id) : saveJob(job.id)} className={cn(isSaved && "text-primary")}>
                  {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </Button>
                <Button onClick={() => openApplyModal({ jobId: job.id, jobTitle: job.title, companyName: job.company.name })} disabled={hasApplied || job.eligibilityStatus === "not-eligible"}>
                  {hasApplied ? "Applied" : "Apply Now"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{job.description}</p>
              <h4 className="font-semibold mt-6 mb-2">Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
              <h4 className="font-semibold mt-6 mb-2">Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Eligibility</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Min CGPA</span><span className="font-medium">{job.eligibility.minCgpa}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Batches</span><span className="font-medium">{job.eligibility.batches.join(", ")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">No Backlogs</span><span className="font-medium">{job.eligibility.noBacklogs ? "Required" : "Allowed"}</span></div>
                <div><span className="text-muted-foreground">Branches:</span><div className="flex flex-wrap gap-1 mt-1">{job.eligibility.branches.map((b) => <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>)}</div></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Deadline</CardTitle></CardHeader>
              <CardContent><div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>{format(new Date(job.deadline), "PPP")}</span></div></CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={applyModalOpen} onOpenChange={closeApplyModal}>
          <DialogContent>
            <DialogHeader><DialogTitle>Confirm Application</DialogTitle><DialogDescription>You are about to apply for <strong>{job.title}</strong> at <strong>{job.company.name}</strong>.</DialogDescription></DialogHeader>
            <DialogFooter><Button variant="outline" onClick={closeApplyModal}>Cancel</Button><Button onClick={handleApply} disabled={applyMutation.isPending}>{applyMutation.isPending ? "Submitting..." : "Confirm Application"}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}