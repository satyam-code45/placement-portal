import { useState } from "react";
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
    pending: { color: "bg-amber-100 text-amber-700", icon: Clock },
    approved: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    rejected: { color: "bg-red-100 text-red-700", icon: XCircle },
    closed: { color: "bg-gray-100 text-gray-700", icon: XCircle },
  };

  const sourceConfig: Record<string, string> = {
    linkedin: "bg-blue-100 text-blue-700",
    internshala: "bg-cyan-100 text-cyan-700",
    naukri: "bg-purple-100 text-purple-700",
    manual: "bg-slate-100 text-slate-700",
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
                    className="text-emerald-600"
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

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Opportunities Management</h1>
            <p className="text-muted-foreground">
              Manage job postings and internship opportunities
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/admin/opportunities/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Opportunity
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{opportunities.length}</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-amber-700">Pending Review</p>
              <p className="text-2xl font-bold text-amber-700">
                {pendingCount}
              </p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-700">Approved</p>
              <p className="text-2xl font-bold text-emerald-700">
                {approvedCount}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Active Internships
              </p>
              <p className="text-2xl font-bold">
                {
                  opportunities.filter(
                    (o) => o.type === "internship" && o.status === "approved",
                  ).length
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                <CardContent className="p-12 text-center text-muted-foreground">
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
            {filteredOpportunities
              .filter((o) => o.source !== "manual")
              .map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
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
