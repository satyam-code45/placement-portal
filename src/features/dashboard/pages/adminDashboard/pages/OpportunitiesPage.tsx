import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  Download,
  RefreshCw,
  Users,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "../components/layout";
import { mockOpportunities } from "../api/mockData";
import type { Opportunity } from "../types";
import { toast } from "sonner";
import { jobScraperService } from "@/services/jobScraperService";
import {
  jobIntelligenceService,
  type JobIntelligence,
} from "@/services/jobIntelligenceService";
import { studentMatchingService } from "@/services/studentMatchingService";

function OpportunityCard({
  opportunity,
  onApprove,
  onReject,
}: {
  opportunity: Opportunity;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const statusConfig = {
    pending: { color: "bg-gray-100 text-gray-700", icon: Clock },
    approved: { color: "bg-gray-100 text-gray-700", icon: CheckCircle2 },
    rejected: { color: "bg-yellow-100 text-red-700", icon: XCircle },
    closed: { color: "bg-gray-100 text-gray-700", icon: XCircle },
  };

  const sourceConfig: Record<string, string> = {
    linkedin: "bg-gray-100 text-gray-700",
    internshala: "bg-gray-100 text-gray-700",
    naukri: "bg-gray-100 text-gray-700",
    manual: "bg-gray-100 text-gray-700",
    other: "bg-gray-100 text-gray-700",
  };

  const StatusIcon = statusConfig[opportunity.status].icon;

  const formatSalary = (ctc: { min: number; max: number }, type: string) => {
    if (type === "internship") {
      return `₹${(ctc.min / 1000).toFixed(0)}k - ₹${(ctc.max / 1000).toFixed(0)}k/mo`;
    }
    return `₹${(ctc.min / 100000).toFixed(1)}L - ₹${(ctc.max / 100000).toFixed(1)}L`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg truncate">
                {opportunity.roleTitle}
              </h3>
              <Badge className={statusConfig[opportunity.status].color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {opportunity.status}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {opportunity.companyName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {opportunity.location}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4" />
                {formatSalary(opportunity.ctc, opportunity.type)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(opportunity.deadline).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline">
                {opportunity.type === "internship" ? "Internship" : "Full-time"}
              </Badge>
              <Badge variant="outline">{opportunity.mode}</Badge>
              <Badge className={sourceConfig[opportunity.source]}>
                {opportunity.source}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1">
              {opportunity.requiredSkills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {opportunity.requiredSkills.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{opportunity.requiredSkills.length - 4}
                </Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Eligibility: {opportunity.eligibility.branches.join(", ")} • Min
              CGPA: {opportunity.eligibility.minCgpa}
            </p>
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
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Applications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {opportunity.status === "pending" && (
                <>
                  <DropdownMenuItem
                    onClick={() => onApprove(opportunity.id)}
                    className="text-gray-600"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onReject(opportunity.id)}
                    className="text-red-600"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [scrapedJobs, setScrapedJobs] = useState<JobIntelligence[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [scrapeDialogOpen, setScrapeDialogOpen] = useState(false);
  const [matchDialogOpen, setMatchDialogOpen] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [isScraping, setIsScraping] = useState(false);
  const [searchTerms, setSearchTerms] = useState(
    "React Native Developer, Frontend Engineer",
  );
  const [locations, setLocations] = useState("India, Remote");
  const [selectedSources, setSelectedSources] = useState({
    linkedin: true,
    internshala: false,
    naukri: false,
    indeed: false,
    glassdoor: false,
  });

  // Fetch job intelligence data on mount
  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const response = await jobIntelligenceService.getLatestJobs();
      setScrapedJobs(response.jobs);
      console.log(
        `Loaded ${response.jobs.length} scraped jobs from run ${response.runId}`,
      );
    } catch (error) {
      console.error("Error fetching job intelligence:", error);
      // Don't show error toast on initial load if no data exists
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.roleTitle.toLowerCase().includes(search.toLowerCase()) ||
      opp.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || opp.status === statusFilter;
    const matchesType = typeFilter === "all" || opp.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleApprove = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, status: "approved" as const } : opp,
      ),
    );
    toast.success("Opportunity approved successfully");
  };

  const handleReject = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, status: "rejected" as const } : opp,
      ),
    );
    toast.success("Opportunity rejected");
  };

  const pendingCount = opportunities.filter(
    (o) => o.status === "pending",
  ).length;
  const approvedCount = opportunities.filter(
    (o) => o.status === "approved",
  ).length;

  const handleSourceToggle = (source: keyof typeof selectedSources) => {
    setSelectedSources((prev) => ({ ...prev, [source]: !prev[source] }));
  };

  const getEstimatedJobs = () => {
    const activeSources = Object.values(selectedSources).filter(Boolean).length;
    const periodMultiplier =
      {
        "1d": 10,
        "3d": 25,
        "7d": 50,
        "14d": 100,
        "30d": 200,
      }[selectedPeriod] || 50;
    return activeSources * periodMultiplier;
  };

  const handleMatchStudents = async () => {
    setIsMatching(true);
    setMatchDialogOpen(false);

    try {
      setMatchingProgress("Starting student-job matching...");

      // For demo, we'll match a sample student (ID: 2)
      // In production, you'd fetch all active students and match them
      const studentId = 2;

      setMatchingProgress(
        `Matching student ${studentId} with available jobs...`,
      );

      const result = await studentMatchingService.matchStudent(studentId);

      if (result.success) {
        toast.success(
          `Successfully matched! Found ${result.jobs_count || 0} suitable jobs for the student.`,
          { duration: 6000 },
        );
      } else {
        toast.error("Matching completed but no suitable jobs found.");
      }

      setMatchingProgress("");
    } catch (error) {
      console.error("Matching error:", error);
      toast.error("Failed to match students with jobs. Please try again.");
      setMatchingProgress("");
    } finally {
      setIsMatching(false);
    }
  };

  const handleScrape = async () => {
    const activeSources = Object.entries(selectedSources)
      .filter(([, enabled]) => enabled)
      .map(([source]) => source);

    if (activeSources.length === 0) {
      toast.error("Please select at least one source");
      return;
    }

    // Parse search terms and locations from input
    const searchTermsArray = searchTerms
      .split(",")
      .map((term) => term.trim())
      .filter(Boolean);

    const locationsArray = locations
      .split(",")
      .map((loc) => loc.trim())
      .filter(Boolean);

    if (searchTermsArray.length === 0) {
      toast.error("Please enter at least one search term");
      return;
    }

    if (locationsArray.length === 0) {
      toast.error("Please enter at least one location");
      return;
    }

    // Convert period to hours
    const hoursMap: Record<string, number> = {
      "1d": 24,
      "3d": 72,
      "7d": 168,
      "14d": 336,
      "30d": 720,
    };

    setIsScraping(true);
    setScrapeDialogOpen(false);

    try {
      const response = await jobScraperService.scrapeJobs({
        search_terms: searchTermsArray,
        locations: locationsArray,
        site_names: activeSources,
        results_wanted: 100,
        hours_old: hoursMap[selectedPeriod] || 72,
      });

      toast.success(
        `Successfully scraped ${response.jobs?.length || 0} jobs! They will be processed and added to your opportunities.`,
        { duration: 6000 },
      );

      // Refresh job intelligence data after scraping
      setTimeout(() => {
        fetchLatestJobs();
      }, 2000);
    } catch (error) {
      console.error("Scraping error:", error);
      toast.error("Failed to scrape jobs. Please try again later.");
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Opportunities Management</h1>
            <p className="text-gray-600">
              Manage job postings and internship opportunities
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={fetchLatestJobs}
              disabled={isLoadingJobs}
              className="border-black hover:bg-gray-100"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isLoadingJobs ? "animate-spin" : ""}`}
              />
              Refresh Jobs
            </Button>
            <Dialog open={matchDialogOpen} onOpenChange={setMatchDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-black hover:bg-green-600 hover:text-white"
                  disabled={isMatching || scrapedJobs.length === 0}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isMatching ? matchingProgress : "Match Students"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] border-2 border-black">
                <DialogHeader>
                  <DialogTitle>Match Students with Jobs</DialogTitle>
                  <DialogDescription>
                    Use AI to match students with suitable job opportunities
                    based on their skills and preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="rounded-lg bg-blue-50 border-2 border-blue-200 p-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-blue-900 mb-1">
                          Smart Matching Algorithm
                        </h4>
                        <p className="text-xs text-blue-700">
                          Our AI analyzes student profiles, skills, experience,
                          and preferences to find the best job matches from{" "}
                          {scrapedJobs.length} available opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available Jobs:</span>
                      <span className="font-semibold text-blue-600">
                        {scrapedJobs.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Matching Mode:</span>
                      <span className="font-semibold">AI-Powered</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setMatchDialogOpen(false)}
                    className="border-black"
                    disabled={isMatching}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleMatchStudents}
                    disabled={isMatching}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Matching
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={scrapeDialogOpen} onOpenChange={setScrapeDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-black hover:bg-yellow-600 hover:text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Scrape Jobs
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] border-2 border-black">
                <DialogHeader>
                  <DialogTitle>Scrape Jobs from Platforms</DialogTitle>
                  <DialogDescription>
                    Configure search parameters to automatically fetch job
                    listings
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Search Terms Input */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">
                      Search Terms
                    </Label>
                    <Input
                      placeholder="e.g., React Native Developer, Frontend Engineer"
                      value={searchTerms}
                      onChange={(e) => setSearchTerms(e.target.value)}
                      className="border-2 border-gray-300"
                    />
                    <p className="text-xs text-gray-500">
                      Separate multiple terms with commas
                    </p>
                  </div>

                  {/* Locations Input */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Locations</Label>
                    <Input
                      placeholder="e.g., India, Remote, Bangalore"
                      value={locations}
                      onChange={(e) => setLocations(e.target.value)}
                      className="border-2 border-gray-300"
                    />
                    <p className="text-xs text-gray-500">
                      Separate multiple locations with commas
                    </p>
                  </div>

                  {/* Time Period Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Time Period</Label>
                    <Select
                      value={selectedPeriod}
                      onValueChange={setSelectedPeriod}
                    >
                      <SelectTrigger className="border-2 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1d">Last 24 Hours</SelectItem>
                        <SelectItem value="3d">Last 3 Days</SelectItem>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="14d">Last 14 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Source Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">
                      Select Sources
                    </Label>
                    <div className="space-y-3 border-2 border-gray-200 rounded-lg p-4">
                      {[
                        { id: "linkedin", label: "LinkedIn", enabled: true },
                        {
                          id: "internshala",
                          label: "Internshala",
                          enabled: true,
                        },
                        { id: "naukri", label: "Naukri.com", enabled: true },
                        {
                          id: "indeed",
                          label: "Indeed (Coming Soon)",
                          enabled: false,
                        },
                        {
                          id: "glassdoor",
                          label: "Glassdoor (Coming Soon)",
                          enabled: false,
                        },
                      ].map(({ id, label, enabled }) => (
                        <div key={id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={id}
                            checked={
                              selectedSources[
                                id as keyof typeof selectedSources
                              ]
                            }
                            onChange={() =>
                              enabled &&
                              handleSourceToggle(
                                id as keyof typeof selectedSources,
                              )
                            }
                            disabled={!enabled}
                            className="h-4 w-4 rounded border-2 border-gray-300 text-yellow-600 focus:ring-yellow-600 disabled:opacity-50"
                          />
                          <label
                            htmlFor={id}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${
                              enabled
                                ? "cursor-pointer"
                                : "text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preview Stats */}
                  <div className="rounded-lg bg-gray-50 border-2 border-gray-200 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Selected Sources:</span>
                      <span className="font-semibold">
                        {Object.values(selectedSources).filter(Boolean).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600">Results Wanted:</span>
                      <span className="font-semibold text-yellow-600">
                        100 jobs
                      </span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setScrapeDialogOpen(false)}
                    className="border-black"
                    disabled={isScraping}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleScrape}
                    disabled={
                      Object.values(selectedSources).every((v) => !v) ||
                      isScraping
                    }
                    className="bg-yellow-600 hover:bg-yellow-700 text-white disabled:opacity-50"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isScraping ? "Scraping..." : "Start Scraping"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
              <Link to="/dashboard/admin/opportunities/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Opportunity
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{opportunities.length}</p>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-yellow-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-red-700">Pending Review</p>
              <p className="text-2xl font-bold text-red-700">{pendingCount}</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 bg-gray-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700">Approved</p>
              <p className="text-2xl font-bold text-gray-700">
                {approvedCount}
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-blue-700">Scraped Jobs</p>
              <p className="text-2xl font-bold text-blue-700">
                {scrapedJobs.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by role or company..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Opportunities</TabsTrigger>
            <TabsTrigger value="scraped">Scraped</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredOpportunities.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-gray-600">
                  No opportunities found matching your criteria.
                </CardContent>
              </Card>
            ) : (
              filteredOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="scraped" className="space-y-4">
            {isLoadingJobs ? (
              <Card>
                <CardContent className="p-12 text-center text-gray-600">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                  Loading scraped jobs...
                </CardContent>
              </Card>
            ) : scrapedJobs.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-gray-600">
                  <p className="mb-2">No scraped jobs available yet.</p>
                  <p className="text-sm text-gray-500">
                    Click "Scrape Jobs" to fetch job listings from external
                    platforms.
                  </p>
                </CardContent>
              </Card>
            ) : (
              scrapedJobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg truncate">
                            {job.title}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-700">
                            Score: {job.finalScore.toFixed(1)}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {job.companyName}
                          </span>
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                          )}
                          {job.jobType && (
                            <Badge variant="outline">{job.jobType}</Badge>
                          )}
                          <Badge className="bg-gray-200 text-gray-700">
                            {job.source}
                          </Badge>
                        </div>

                        {job.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {job.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          Scraped:{" "}
                          {new Date(job.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={job.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Apply
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            {filteredOpportunities
              .filter((o) => o.source === "manual")
              .map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
