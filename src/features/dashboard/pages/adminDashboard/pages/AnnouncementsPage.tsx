import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Briefcase,
  Calendar,
  Trophy,
  GraduationCap,
  Bell,
  Edit,
  Trash2,
  Eye,
  Send,
  Clock,
  CheckCircle2,
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
import { mockAnnouncements } from "../api/mockData";
import type { Announcement } from "../types";
import { toast } from "sonner";

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const typeConfig = {
    job: { icon: Briefcase, color: "bg-blue-100 text-blue-700" },
    drive: { icon: Calendar, color: "bg-purple-100 text-purple-700" },
    result: { icon: Trophy, color: "bg-amber-100 text-amber-700" },
    training: { icon: GraduationCap, color: "bg-emerald-100 text-emerald-700" },
    notice: { icon: Bell, color: "bg-red-100 text-red-700" },
  };

  const statusConfig = {
    draft: { color: "bg-gray-100 text-gray-700", icon: Clock },
    published: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    expired: { color: "bg-red-100 text-red-700", icon: Clock },
  };

  const TypeIcon = typeConfig[announcement.type].icon;
  const StatusIcon = statusConfig[announcement.status].icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2 rounded-lg ${typeConfig[announcement.type].color}`}
              >
                <TypeIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <Badge className={statusConfig[announcement.status].color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {announcement.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {announcement.type} Announcement
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {announcement.content}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  Published:{" "}
                  {new Date(announcement.publishDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                    },
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  Expires:{" "}
                  {new Date(announcement.expiryDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                    },
                  )}
                </span>
              </div>
              <div className="flex gap-1">
                {announcement.targetAudience.slice(0, 3).map((audience) => (
                  <Badge key={audience} variant="outline" className="text-xs">
                    {audience}
                  </Badge>
                ))}
                {announcement.targetAudience.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{announcement.targetAudience.length - 3}
                  </Badge>
                )}
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
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {announcement.status === "draft" && (
                <DropdownMenuItem className="text-emerald-600">
                  <Send className="mr-2 h-4 w-4" />
                  Publish
                </DropdownMenuItem>
              )}
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

export default function AnnouncementsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    const matchesSearch = announcement.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      typeFilter === "all" || announcement.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || announcement.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Posts & Announcements</h1>
            <p className="text-muted-foreground">
              Central communication channel for students
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Create a new announcement for students
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input placeholder="Announcement title" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job">Job Announcement</SelectItem>
                        <SelectItem value="drive">Drive Update</SelectItem>
                        <SelectItem value="result">Result</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="notice">Notice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Write your announcement..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Publish Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Audience</label>
                  <Input placeholder="e.g., CSE, IT, All (comma-separated)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Save as Draft</Button>
                <Button
                  onClick={() => toast.success("Announcement published!")}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Posts</p>
              <p className="text-2xl font-bold">{mockAnnouncements.length}</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-700">Published</p>
              <p className="text-2xl font-bold text-emerald-700">
                {
                  mockAnnouncements.filter((a) => a.status === "published")
                    .length
                }
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-amber-700">Drafts</p>
              <p className="text-2xl font-bold text-amber-700">
                {mockAnnouncements.filter((a) => a.status === "draft").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Expired</p>
              <p className="text-2xl font-bold">
                {mockAnnouncements.filter((a) => a.status === "expired").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="job">Job</SelectItem>
                <SelectItem value="drive">Drive</SelectItem>
                <SelectItem value="result">Result</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="notice">Notice</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Announcements List */}
        <div className="grid gap-4">
          {filteredAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No announcements found matching your criteria.
              </CardContent>
            </Card>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
