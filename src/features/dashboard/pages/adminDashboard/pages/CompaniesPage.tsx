import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Building2,
  Globe,
  MapPin,
  Mail,
  Calendar,
  TrendingUp,
  Edit,
  Trash2,
  FileSpreadsheet,
  Upload,
  Eye,
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
import { mockCompanies } from "../api/mockData";
import type { Company } from "../types";
import { toast } from "sonner";

function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-yellow-600/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{company.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {company.industry}
                </p>
              </div>
              <Badge
                variant={
                  company.contactStatus === "active" ? "default" : "secondary"
                }
                className="ml-auto"
              >
                {company.contactStatus}
              </Badge>
            </div>

            <div className="grid gap-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  {company.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Last contacted:{" "}
                  {new Date(company.lastContactedDate).toLocaleDateString(
                    "en-IN",
                  )}
                </span>
              </div>
            </div>

            {/* HR Contacts */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium">HR Contacts</p>
              {company.hrContacts.map((hr, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 text-sm bg-muted/50 p-2 rounded-lg"
                >
                  <span className="font-medium">{hr.name}</span>
                  <span className="text-muted-foreground">
                    {hr.designation}
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <Mail className="h-3 w-3" />
                    <span className="text-xs">{hr.email}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-gray-700" />
                <span>
                  Avg CTC: ₹{(company.averageCTC / 100000).toFixed(1)}L
                </span>
              </div>
              <div className="text-muted-foreground">
                {company.pastHiringHistory.reduce(
                  (acc, h) => acc + h.studentsHired,
                  0,
                )}{" "}
                total hires
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
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
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

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || company.contactStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Company Management</h1>
            <p className="text-gray-600">
              Central CRM for all recruiting companies
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Excel
            </Button>
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Company
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Company</DialogTitle>
                  <DialogDescription>
                    Enter company details to add to your database
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Company Name
                      </label>
                      <Input placeholder="e.g., Google" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Industry</label>
                      <Input placeholder="e.g., Technology" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Website</label>
                      <Input placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input placeholder="e.g., Bangalore, India" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">HR Name</label>
                      <Input placeholder="Contact person name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">HR Email</label>
                      <Input type="email" placeholder="hr@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Additional notes about the company..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button
                    onClick={() => toast.success("Company added successfully!")}
                  >
                    Add Company
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
              <p className="text-sm text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold">{mockCompanies.length}</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 bg-gray-50/50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700">Active</p>
              <p className="text-2xl font-bold text-gray-700">
                {
                  mockCompanies.filter((c) => c.contactStatus === "active")
                    .length
                }
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold">
                {
                  mockCompanies.filter((c) => c.contactStatus === "inactive")
                    .length
                }
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Total Hires</p>
              <p className="text-2xl font-bold">
                {mockCompanies.reduce(
                  (acc, c) =>
                    acc +
                    c.pastHiringHistory.reduce(
                      (a, h) => a + h.studentsHired,
                      0,
                    ),
                  0,
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search companies..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
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
          </div>
        </div>

        {/* Company List */}
        <div className="grid gap-4">
          {filteredCompanies.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-600">
                No companies found matching your criteria.
              </CardContent>
            </Card>
          ) : (
            filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
