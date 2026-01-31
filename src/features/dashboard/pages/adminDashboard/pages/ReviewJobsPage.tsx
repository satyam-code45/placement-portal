import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Shield,
  User,
  GraduationCap,
  Building2,
  MapPin,
  IndianRupee,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminLayout } from "../components/layout";
import { mockReviewJobs } from "../api/mockData";
import type { ReviewJob } from "../types";
import { toast } from "sonner";

function ReviewJobCard({
  job,
  onApprove,
  onReject,
}: {
  job: ReviewJob;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const statusConfig = {
    pending: { color: "bg-amber-100 text-amber-700", icon: Clock },
    verified: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    rejected: { color: "bg-red-100 text-red-700", icon: XCircle },
  };

  const submitterConfig = {
    alumni: { icon: GraduationCap, color: "text-blue-600" },
    faculty: { icon: User, color: "text-purple-600" },
    external: { icon: Building2, color: "text-gray-600" },
  };

  const StatusIcon = statusConfig[job.verificationStatus].icon;
  const SubmitterIcon = submitterConfig[job.submitterType].icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2 rounded-lg bg-muted ${submitterConfig[job.submitterType].color}`}
              >
                <SubmitterIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {job.opportunityDetails.companyName} -{" "}
                  {job.opportunityDetails.roleTitle}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Submitted by: {job.submittedBy}
                </p>
              </div>
              <Badge
                className={`ml-auto ${statusConfig[job.verificationStatus].color}`}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {job.verificationStatus}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
              {job.opportunityDetails.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.opportunityDetails.location}
                </span>
              )}
              {job.opportunityDetails.ctc && (
                <span className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />₹
                  {(job.opportunityDetails.ctc.min / 100000).toFixed(1)}L - ₹
                  {(job.opportunityDetails.ctc.max / 100000).toFixed(1)}L
                </span>
              )}
              {job.opportunityDetails.type && (
                <Badge variant="outline">{job.opportunityDetails.type}</Badge>
              )}
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">Credibility Score:</span>
                <span
                  className={`font-bold ${job.credibilityScore >= 80 ? "text-emerald-600" : job.credibilityScore >= 60 ? "text-amber-600" : "text-red-600"}`}
                >
                  {job.credibilityScore}%
                </span>
              </div>
              <Progress value={job.credibilityScore} className="w-24 h-2" />
            </div>

            {job.adminNotes && (
              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                <span className="font-medium">Admin Notes: </span>
                {job.adminNotes}
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {job.verificationStatus === "pending" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onApprove(job.id)}
                    className="text-emerald-600"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verify & Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onReject(job.id)}
                    className="text-red-600"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReviewJobsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [jobs, setJobs] = useState(mockReviewJobs);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.opportunityDetails.companyName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      job.submittedBy.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || job.verificationStatus === statusFilter;
    const matchesSource =
      sourceFilter === "all" || job.submitterType === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleApprove = (id: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, verificationStatus: "verified" as const }
          : job,
      ),
    );
    toast.success("Job verified and approved!");
  };

  const handleReject = (id: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, verificationStatus: "rejected" as const }
          : job,
      ),
    );
    toast.success("Job rejected");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Review Jobs</h1>
            <p className="text-muted-foreground">
              Quality control for alumni referrals and external opportunities
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Submissions</p>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-amber-700">Pending Review</p>
              <p className="text-2xl font-bold text-amber-700">
                {jobs.filter((j) => j.verificationStatus === "pending").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-700">Verified</p>
              <p className="text-2xl font-bold text-emerald-700">
                {jobs.filter((j) => j.verificationStatus === "verified").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Avg Credibility</p>
              <p className="text-2xl font-bold">
                {(
                  jobs.reduce((acc, j) => acc + j.credibilityScore, 0) /
                  jobs.length
                ).toFixed(0)}
                %
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company or submitter..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="external">External</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job List */}
        <div className="grid gap-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No jobs found matching your criteria.
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <ReviewJobCard
                key={job.id}
                job={job}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
