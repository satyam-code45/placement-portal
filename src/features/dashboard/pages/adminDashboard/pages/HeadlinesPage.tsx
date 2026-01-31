import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  Trophy,
  Image,
  Edit,
  Trash2,
  Eye,
  Megaphone,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { mockHeadlines } from "../api/mockData";
import type { CompanyHeadline } from "../types";
import { toast } from "sonner";

function HeadlineCard({ headline }: { headline: CompanyHeadline }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Megaphone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{headline.headline}</h3>
                <p className="text-sm text-muted-foreground">
                  {headline.companyName}
                </p>
              </div>
            </div>

            {headline.announcement && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">{headline.announcement}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {headline.rolesOffered.map((role) => (
                <Badge key={role} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(headline.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>
                  Selection Ratio: {(headline.selectionRatio * 100).toFixed(0)}%
                </span>
              </div>
              {headline.gallery && headline.gallery.length > 0 && (
                <div className="flex items-center gap-1">
                  <Image className="h-4 w-4" />
                  <span>{headline.gallery.length} photos</span>
                </div>
              )}
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
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Image className="mr-2 h-4 w-4" />
                Manage Gallery
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

export default function HeadlinesPage() {
  const [search, setSearch] = useState("");

  const filteredHeadlines = mockHeadlines.filter(
    (headline) =>
      headline.companyName.toLowerCase().includes(search.toLowerCase()) ||
      headline.headline.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Company Headlines & Timeline</h1>
            <p className="text-muted-foreground">
              Institutional memory and branding for placement drives
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Headline
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Company Headline</DialogTitle>
                <DialogDescription>
                  Create a new placement drive headline
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input placeholder="e.g., Google" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Headline</label>
                  <Input placeholder="e.g., Google Campus Drive 2026" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Roles Offered</label>
                  <Input placeholder="e.g., SDE, PM (comma-separated)" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Selection Ratio (%)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 15"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Announcement</label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Optional announcement text..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("Headline added!")}>
                  Add Headline
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Headlines</p>
              <p className="text-2xl font-bold">{mockHeadlines.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
              <p className="text-2xl font-bold">
                {
                  mockHeadlines.filter((h) => new Date(h.date) > new Date())
                    .length
                }
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Avg Selection Rate
              </p>
              <p className="text-2xl font-bold">
                {(
                  (mockHeadlines.reduce((acc, h) => acc + h.selectionRatio, 0) /
                    mockHeadlines.length) *
                  100
                ).toFixed(0)}
                %
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search headlines..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Headlines List */}
        <div className="grid gap-4">
          {filteredHeadlines.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No headlines found matching your criteria.
              </CardContent>
            </Card>
          ) : (
            filteredHeadlines.map((headline) => (
              <HeadlineCard key={headline.id} headline={headline} />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
