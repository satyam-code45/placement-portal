import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  UserPlus,
  FileSpreadsheet,
  Upload,
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
import { mockAlumni } from "../api/mockData";
import type { AlumniRecord } from "../types";
import { toast } from "sonner";

function AlumniCard({ alumni }: { alumni: AlumniRecord }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
                  {alumni.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{alumni.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Class of {alumni.graduationYear}
                </p>
              </div>
              <Badge
                variant={
                  alumni.engagementStatus === "active" ? "default" : "secondary"
                }
                className="ml-auto"
              >
                {alumni.engagementStatus}
              </Badge>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{alumni.role}</span>
              <span className="text-muted-foreground">at</span>
              <span className="font-medium text-primary">{alumni.company}</span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{alumni.email}</span>
              </div>
              {alumni.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{alumni.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {alumni.willingToRefer ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
                <span className="text-sm">
                  {alumni.willingToRefer
                    ? "Willing to refer"
                    : "Not available for referrals"}
                </span>
              </div>
              <Badge variant="secondary">
                {alumni.pastReferrals} past referrals
              </Badge>
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
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Request Referral
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

export default function AlumniPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [referralFilter, setReferralFilter] = useState("all");

  const filteredAlumni = mockAlumni.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(search.toLowerCase()) ||
      alumni.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || alumni.engagementStatus === statusFilter;
    const matchesReferral =
      referralFilter === "all" ||
      (referralFilter === "willing" && alumni.willingToRefer) ||
      (referralFilter === "not-willing" && !alumni.willingToRefer);
    return matchesSearch && matchesStatus && matchesReferral;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Alumni Management</h1>
            <p className="text-muted-foreground">
              Alumni-driven placement pipeline and referral network
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Alumni
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Alumni</DialogTitle>
                  <DialogDescription>
                    Add an alumni to your placement network
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="e.g., John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Graduation Year
                      </label>
                      <Input type="number" placeholder="e.g., 2022" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input placeholder="e.g., Google" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <Input placeholder="e.g., Software Engineer" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Phone (Optional)
                      </label>
                      <Input placeholder="+91-XXXXXXXXXX" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button
                    onClick={() => toast.success("Alumni added successfully!")}
                  >
                    Add Alumni
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Alumni</p>
              <p className="text-2xl font-bold">{mockAlumni.length}</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-700">Active</p>
              <p className="text-2xl font-bold text-emerald-700">
                {
                  mockAlumni.filter((a) => a.engagementStatus === "active")
                    .length
                }
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-blue-700">Willing to Refer</p>
              <p className="text-2xl font-bold text-blue-700">
                {mockAlumni.filter((a) => a.willingToRefer).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Referrals</p>
              <p className="text-2xl font-bold">
                {mockAlumni.reduce((acc, a) => acc + a.pastReferrals, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or company..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={referralFilter} onValueChange={setReferralFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Referral" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="willing">Willing to Refer</SelectItem>
                <SelectItem value="not-willing">Not Available</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alumni List */}
        <div className="grid gap-4">
          {filteredAlumni.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No alumni found matching your criteria.
              </CardContent>
            </Card>
          ) : (
            filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
