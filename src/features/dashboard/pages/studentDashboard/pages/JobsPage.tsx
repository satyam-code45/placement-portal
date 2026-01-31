import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Building2,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { JobFilters, JobWithEligibility } from "../types";
import {
  useCompanies,
  useJobs,
  useLocations,
  useSavedJobs,
} from "../hooks/useJobs";
import { useHasApplied } from "../hooks/useApplication";
import { AppLayout } from "../component/layout";
import { STUDENT_JOBS_ROUTE } from "../types/common";

function JobCard({ job }: { job: JobWithEligibility }) {
  const { savedJobs, saveJob, unsaveJob } = useSavedJobs();
  const { data: hasApplied } = useHasApplied(job.id);
  const isSaved = savedJobs.some((s) => s.jobId === job.id);

  const eligibilityIcon = {
    eligible: <CheckCircle className="h-4 w-4 text-success" />,
    "partially-eligible": <AlertCircle className="h-4 w-4 text-warning" />,
    "not-eligible": <XCircle className="h-4 w-4 text-destructive" />,
  };

  const eligibilityLabel = {
    eligible: "Eligible",
    "partially-eligible": "Partial Match",
    "not-eligible": "Not Eligible",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link
                to={`${STUDENT_JOBS_ROUTE}/${job.id}`}
                className="font-semibold text-lg hover:text-primary truncate"
              >
                {job.title}
              </Link>
              {hasApplied && (
                <Badge className="bg-success text-success-foreground">
                  Applied
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
              <Building2 className="h-4 w-4" />
              <span>{job.company.name}</span>
              <span className="text-border">•</span>
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                {job.type === "internship" ? "Internship" : "Full-time"}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <DollarSign className="h-3 w-3" />
                {job.type === "internship"
                  ? `$${job.salary.min}-${job.salary.max}/mo`
                  : `$${(job.salary.min / 1000).toFixed(0)}k-${(job.salary.max / 1000).toFixed(0)}k`}
              </Badge>
              <Badge
                variant={
                  job.eligibilityStatus === "eligible"
                    ? "default"
                    : job.eligibilityStatus === "partially-eligible"
                      ? "secondary"
                      : "destructive"
                }
                className="gap-1"
              >
                {eligibilityIcon[job.eligibilityStatus]}
                {eligibilityLabel[job.eligibilityStatus]}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (isSaved ? unsaveJob(job.id) : saveJob(job.id))}
            className={cn(isSaved && "text-primary")}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    company: "",
    location: "",
    type: "",
    minSalary: 0,
    eligibilityStatus: "",
  });
  const { data: jobs, isLoading } = useJobs(filters);
  const { data: companies } = useCompanies();
  const { data: locations } = useLocations();

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-9"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            value={filters.company}
            onValueChange={(v) =>
              setFilters({ ...filters, company: v === "all" ? "" : v })
            }
          >
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies?.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.location}
            onValueChange={(v) =>
              setFilters({ ...filters, location: v === "all" ? "" : v })
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations?.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.eligibilityStatus}
            onValueChange={(v) =>
              setFilters({
                ...filters,
                eligibilityStatus: v === "all" ? "" : (v as any),
              })
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Eligibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="eligible">Eligible</SelectItem>
              <SelectItem value="partially-eligible">Partial Match</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            Array(5)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className="h-32" />)
          ) : jobs?.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No jobs found matching your criteria.
              </CardContent>
            </Card>
          ) : (
            jobs?.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </AppLayout>
  );
}
