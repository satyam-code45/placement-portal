import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Video,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit,
  Trash2,
  Sparkles,
  Bell,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminLayout } from "../components/layout";
import { mockOutreach } from "../api/mockData";
import type { RecruiterOutreach } from "../types";
import { toast } from "sonner";

function OutreachCard({ outreach }: { outreach: RecruiterOutreach }) {
  const statusConfig = {
    responded: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    pending: { color: "bg-amber-100 text-amber-700", icon: Clock },
    "follow-up": { color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  };

  const modeConfig = {
    email: { icon: Mail, color: "text-blue-600" },
    call: { icon: Phone, color: "text-emerald-600" },
    meeting: { icon: Video, color: "text-purple-600" },
  };

  const StatusIcon = statusConfig[outreach.status].icon;
  const ModeIcon = modeConfig[outreach.contactMode].icon;

  const isOverdue =
    new Date(outreach.nextFollowUpDate) < new Date() &&
    outreach.status !== "responded";

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${isOverdue ? "border-amber-300" : ""}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2 rounded-lg bg-muted ${modeConfig[outreach.contactMode].color}`}
              >
                <ModeIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{outreach.companyName}</h3>
                <p className="text-sm text-muted-foreground">
                  {outreach.recruiterName}
                </p>
              </div>
              <Badge
                className={`ml-auto ${statusConfig[outreach.status].color}`}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {outreach.status}
              </Badge>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 mb-3">
              <p className="text-sm">{outreach.summary}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(outreach.dateTime).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 ${isOverdue ? "text-amber-600 font-medium" : ""}`}
              >
                <Bell className="h-4 w-4" />
                <span>
                  Follow-up:{" "}
                  {new Date(outreach.nextFollowUpDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                    },
                  )}
                  {isOverdue && " (Overdue)"}
                </span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Note
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as Responded
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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

export default function OutreachPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");

  const filteredOutreach = mockOutreach.filter((item) => {
    const matchesSearch =
      item.companyName.toLowerCase().includes(search.toLowerCase()) ||
      item.recruiterName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesMode = modeFilter === "all" || item.contactMode === modeFilter;
    return matchesSearch && matchesStatus && matchesMode;
  });

  const pendingFollowUps = mockOutreach.filter(
    (o) =>
      new Date(o.nextFollowUpDate) < new Date() && o.status !== "responded",
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Recruiter Outreach</h1>
            <p className="text-muted-foreground">
              Track all conversations and follow-ups with recruiters
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Log Communication
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Log New Communication</DialogTitle>
                <DialogDescription>
                  Record a conversation with a recruiter
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="microsoft">Microsoft</SelectItem>
                        <SelectItem value="amazon">Amazon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Mode</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="call">Phone Call</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recruiter Name</label>
                  <Input placeholder="Contact person name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Summary</label>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="What was discussed..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Next Follow-up Date
                  </label>
                  <Input type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("Communication logged!")}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Total Interactions
              </p>
              <p className="text-2xl font-bold">{mockOutreach.length}</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-700">Responded</p>
              <p className="text-2xl font-bold text-emerald-700">
                {mockOutreach.filter((o) => o.status === "responded").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-amber-700">Pending</p>
              <p className="text-2xl font-bold text-amber-700">
                {mockOutreach.filter((o) => o.status === "pending").length}
              </p>
            </CardContent>
          </Card>
          <Card
            className={
              pendingFollowUps > 0 ? "border-red-200 bg-red-50/50" : ""
            }
          >
            <CardContent className="p-4">
              <p
                className={`text-sm ${pendingFollowUps > 0 ? "text-red-700" : "text-muted-foreground"}`}
              >
                Overdue Follow-ups
              </p>
              <p
                className={`text-2xl font-bold ${pendingFollowUps > 0 ? "text-red-700" : ""}`}
              >
                {pendingFollowUps}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Feature Hint */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-purple-900">AI-Powered Features</p>
              <p className="text-sm text-purple-700">
                Get auto-generated conversation summaries and smart follow-up
                reminders
              </p>
            </div>
            <Button
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-100"
            >
              Enable AI
            </Button>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company or recruiter..."
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
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Outreach List */}
        <div className="grid gap-4">
          {filteredOutreach.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No communications found matching your criteria.
              </CardContent>
            </Card>
          ) : (
            filteredOutreach.map((item) => (
              <OutreachCard key={item.id} outreach={item} />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
