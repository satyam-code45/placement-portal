import { useState, useEffect } from "react";
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
  ExternalLink,
  Calendar,
  RefreshCw,
  Sparkles,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import {
  jobIntelligenceService,
  type JobIntelligence,
} from "@/services/jobIntelligenceService";

function ScrapedJobCard({ job }: { job: JobIntelligence }) {
  return (
    <Card className="hover:shadow-lg transition-all border-blue-200 bg-gradient-to-br from-blue-50/50 to-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <h3 className="font-semibold text-base truncate">{job.title}</h3>
              <Badge className="bg-blue-600 text-white text-xs shrink-0 w-fit">
                <Sparkles className="h-3 w-3 mr-1" />
                {job.finalScore.toFixed(1)}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5 truncate max-w-full">
                <Building2 className="h-4 w-4 shrink-0" />
                <span className="font-medium truncate">{job.companyName}</span>
              </span>
              {job.location && (
                <span className="flex items-center gap-1.5 truncate">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </span>
              )}
              {job.jobType && (
                <Badge variant="outline" className="text-xs shrink-0">
                  {job.jobType}
                </Badge>
              )}
              <Badge className="bg-gray-100 text-gray-700 text-xs shrink-0">
                {job.source}
              </Badge>
            </div>
            {job.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 break-words">
                {job.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                Posted:{" "}
                {new Date(job.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <Button size="sm" className="shrink-0 w-full sm:w-auto" asChild>
            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

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
  const [scrapedJobs, setScrapedJobs] = useState<JobIntelligence[]>([]);
  const [isLoadingScraped, setIsLoadingScraped] = useState(false);
  const [scrapedError, setScrapedError] = useState<string>("");
  const { data: jobs, isLoading } = useJobs(filters);
  const { data: companies } = useCompanies();
  const { data: locations } = useLocations();

  // Fetch job intelligence data on mount
  useEffect(() => {
    fetchScrapedJobs();
  }, []);

  const fetchScrapedJobs = async () => {
    setIsLoadingScraped(true);
    setScrapedError("");
    try {
      console.log("Fetching scraped jobs...");
      const response = await jobIntelligenceService.getLatestJobs();
      console.log("Scraped jobs response:", response);
      setScrapedJobs(response.jobs || []);
      console.log(`Loaded ${response.jobs?.length || 0} scraped jobs`);
    } catch (error) {
      console.error("Error fetching scraped jobs:", error);
      setScrapedError(
        error instanceof Error
          ? error.message
          : "Failed to load job opportunities",
      );
    } finally {
      setIsLoadingScraped(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={fetchScrapedJobs}
              disabled={isLoadingScraped}
              size="sm"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isLoadingScraped ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
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
        </div>

        {scrapedError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{scrapedError}</AlertDescription>
          </Alert>
        )}

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
          {/* Scraped Jobs - AI Recommended */}
          {isLoadingScraped ? (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading latest opportunities...
              </div>
              <Skeleton className="h-40" />
            </>
          ) : scrapedJobs.length > 0 ? (
            <>
              <div className="flex items-center gap-2 pt-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold">
                  AI Recommended Opportunities
                </h2>
                <Badge className="bg-blue-600 text-white">
                  {scrapedJobs.length}
                </Badge>
              </div>
              {scrapedJobs.map((job) => (
                <ScrapedJobCard key={job.id} job={job} />
              ))}
              {jobs && jobs.length > 0 && (
                <div className="flex items-center gap-2 pt-4">
                  <Building2 className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-semibold">Campus Placements</h2>
                  <Badge variant="outline">{jobs.length}</Badge>
                </div>
              )}
            </>
          ) : null}

          {/* Regular Jobs */}
          {isLoading ? (
            Array(5)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className="h-32" />)
          ) : jobs?.length === 0 && scrapedJobs.length === 0 ? (
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
