import { useState } from "react";
import {
  Search,
  Brain,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Flag,
  Video,
  MessageSquare,
  BarChart3,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { mockInterviews } from "../api/mockData";
import type { MockInterviewRecord } from "../types";
import { toast } from "sonner";

function InterviewCard({ interview }: { interview: MockInterviewRecord }) {
  const statusConfig = {
    scheduled: { color: "bg-blue-100 text-blue-700", icon: Clock },
    completed: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    cancelled: { color: "bg-yellow-100 text-red-700", icon: XCircle },
  };

  const typeConfig = {
    hr: "HR Interview",
    technical: "Technical",
    "role-specific": "Role-specific",
  };

  const StatusIcon = statusConfig[interview.status].icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {interview.studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{interview.studentName}</h3>
                <p className="text-sm text-muted-foreground">
                  ID: {interview.studentId} •{" "}
                  {typeConfig[interview.interviewType]}
                </p>
              </div>
              <Badge
                className={`ml-auto ${statusConfig[interview.status].color}`}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {interview.status}
              </Badge>
            </div>

            {interview.status === "completed" && interview.aiScore && (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {interview.aiScore}
                    </p>
                    <p className="text-xs text-muted-foreground">AI Score</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">
                      {interview.communicationScore}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Communication
                    </p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">
                      {interview.technicalScore}
                    </p>
                    <p className="text-xs text-muted-foreground">Technical</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">
                      {interview.resumeScore}
                    </p>
                    <p className="text-xs text-muted-foreground">Resume</p>
                  </div>
                </div>

                {interview.suggestions && interview.suggestions.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-amber-800 mb-1">
                      Improvement Areas:
                    </p>
                    <ul className="text-sm text-amber-700 list-disc list-inside">
                      {interview.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {interview.status === "scheduled" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Scheduled for{" "}
                  {new Date(interview.scheduledDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </span>
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
              {interview.status === "completed" && (
                <DropdownMenuItem>
                  <Video className="mr-2 h-4 w-4" />
                  View Recording
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Notes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-amber-600">
                <Flag className="mr-2 h-4 w-4" />
                Flag for Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MockInterviewsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredInterviews = mockInterviews.filter((interview) => {
    const matchesSearch = interview.studentName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || interview.status === statusFilter;
    const matchesType =
      typeFilter === "all" || interview.interviewType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const completedInterviews = mockInterviews.filter(
    (i) => i.status === "completed",
  );
  const avgScore =
    completedInterviews.length > 0
      ? (
          completedInterviews.reduce((acc, i) => acc + (i.aiScore || 0), 0) /
          completedInterviews.length
        ).toFixed(0)
      : 0;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mock Interview Management</h1>
            <p className="text-muted-foreground">
              Monitor student preparation quality and AI-powered assessments
            </p>
          </div>
          <Button onClick={() => toast.success("Feature coming soon!")}>
            <Brain className="mr-2 h-4 w-4" />
            Assign Mock Interview
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Interviews</p>
              <p className="text-2xl font-bold">{mockInterviews.length}</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-700">Completed</p>
              <p className="text-2xl font-bold text-emerald-700">
                {completedInterviews.length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-blue-700">Scheduled</p>
              <p className="text-2xl font-bold text-blue-700">
                {mockInterviews.filter((i) => i.status === "scheduled").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Avg AI Score</p>
              <p className="text-2xl font-bold">{avgScore}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Score Distribution
            </CardTitle>
            <CardDescription>
              Performance across different assessment areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Score</span>
                  <span className="font-medium">
                    {(
                      completedInterviews.reduce(
                        (acc, i) => acc + (i.aiScore || 0),
                        0,
                      ) / completedInterviews.length || 0
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    completedInterviews.reduce(
                      (acc, i) => acc + (i.aiScore || 0),
                      0,
                    ) / completedInterviews.length || 0
                  }
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Communication</span>
                  <span className="font-medium">
                    {(
                      completedInterviews.reduce(
                        (acc, i) => acc + (i.communicationScore || 0),
                        0,
                      ) / completedInterviews.length || 0
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    completedInterviews.reduce(
                      (acc, i) => acc + (i.communicationScore || 0),
                      0,
                    ) / completedInterviews.length || 0
                  }
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Technical</span>
                  <span className="font-medium">
                    {(
                      completedInterviews.reduce(
                        (acc, i) => acc + (i.technicalScore || 0),
                        0,
                      ) / completedInterviews.length || 0
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    completedInterviews.reduce(
                      (acc, i) => acc + (i.technicalScore || 0),
                      0,
                    ) / completedInterviews.length || 0
                  }
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Resume</span>
                  <span className="font-medium">
                    {(
                      completedInterviews.reduce(
                        (acc, i) => acc + (i.resumeScore || 0),
                        0,
                      ) / completedInterviews.length || 0
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    completedInterviews.reduce(
                      (acc, i) => acc + (i.resumeScore || 0),
                      0,
                    ) / completedInterviews.length || 0
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hr">HR Interview</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="role-specific">Role-specific</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Interview List */}
        <div className="grid gap-4">
          {filteredInterviews.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No mock interviews found matching your criteria.
              </CardContent>
            </Card>
          ) : (
            filteredInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
