import {
  FileBarChart,
  Download,
  Calendar,
  Building2,
  Users,
  GraduationCap,
  TrendingUp,
  FileText,
  FileSpreadsheet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminLayout } from "../components/layout";
import { toast } from "sonner";

const reportTypes = [
  {
    id: "placement-summary",
    title: "Year-wise Placement Report",
    description: "Complete placement statistics for the academic year",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-700",
    formats: ["PDF", "Excel"],
  },
  {
    id: "branch-statistics",
    title: "Branch-wise Statistics",
    description: "Detailed placement data by branch/department",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-700",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "company-participation",
    title: "Company Participation Report",
    description: "Companies visited, roles offered, and hiring data",
    icon: Building2,
    color: "bg-emerald-100 text-emerald-700",
    formats: ["PDF", "Excel"],
  },
  {
    id: "student-outcome",
    title: "Student Outcome Report",
    description: "Individual student placement status and offers",
    icon: Users,
    color: "bg-amber-100 text-amber-700",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "package-analysis",
    title: "Package Analysis Report",
    description: "CTC distribution, trends, and comparisons",
    icon: TrendingUp,
    color: "bg-cyan-100 text-cyan-700",
    formats: ["PDF", "Excel"],
  },
  {
    id: "naac-nba",
    title: "NAAC/NBA Report",
    description: "Accreditation-ready formatted report",
    icon: FileBarChart,
    color: "bg-red-100 text-red-700",
    formats: ["PDF"],
  },
];

const recentReports = [
  {
    name: "Placement Report 2025-26",
    date: "2026-01-28",
    type: "PDF",
    size: "2.4 MB",
  },
  {
    name: "Branch Statistics Q3",
    date: "2026-01-15",
    type: "Excel",
    size: "856 KB",
  },
  {
    name: "Company List 2025-26",
    date: "2026-01-10",
    type: "CSV",
    size: "124 KB",
  },
  { name: "NAAC Data 2025", date: "2025-12-20", type: "PDF", size: "1.8 MB" },
];

export default function ReportsPage() {
  const handleGenerateReport = (_reportId: string, format: string) => {
    toast.success(`Generating ${format} report...`);
    // Simulate download
    setTimeout(() => {
      toast.success("Report downloaded successfully!");
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reports & Export</h1>
            <p className="text-muted-foreground">
              Generate reports for NAAC/NBA compliance and audit readiness
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="2026">
              <SelectTrigger className="w-36">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2025-26</SelectItem>
                <SelectItem value="2025">2024-25</SelectItem>
                <SelectItem value="2024">2023-24</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Placements</p>
              <p className="text-2xl font-bold">142</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Companies Visited</p>
              <p className="text-2xl font-bold">52</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Highest Package</p>
              <p className="text-2xl font-bold">₹35L</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Average Package</p>
              <p className="text-2xl font-bold">₹8.5L</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Types */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Generate Reports</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Card
                  key={report.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${report.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {report.description}
                        </p>
                        <div className="flex gap-2">
                          {report.formats.map((format) => (
                            <Button
                              key={format}
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleGenerateReport(report.id, format)
                              }
                            >
                              {format === "PDF" ? (
                                <FileText className="h-3 w-3 mr-1" />
                              ) : format === "Excel" ? (
                                <FileSpreadsheet className="h-3 w-3 mr-1" />
                              ) : (
                                <Download className="h-3 w-3 mr-1" />
                              )}
                              {format}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Generated Reports</CardTitle>
            <CardDescription>
              Download or regenerate previous reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {report.type === "PDF" ? (
                      <FileText className="h-5 w-5 text-red-500" />
                    ) : report.type === "Excel" ? (
                      <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <FileText className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{report.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(report.date).toLocaleDateString("en-IN")} •{" "}
                        {report.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{report.type}</Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Report Builder */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Custom Report Builder</h3>
                <p className="text-sm text-muted-foreground">
                  Create customized reports with specific filters and data
                  points
                </p>
              </div>
              <Button onClick={() => toast.success("Feature coming soon!")}>
                <FileBarChart className="mr-2 h-4 w-4" />
                Build Custom Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
