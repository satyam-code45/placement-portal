import {
  Users,
  GraduationCap,
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  CheckCircle2,
  Target,
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminLayout } from "../components/layout";

// Mock analytics data
const studentAnalytics = {
  totalRegistered: 850,
  eligible: 720,
  ineligible: 130,
  placed: 142,
  branchWise: {
    CSE: { total: 280, eligible: 260, placed: 85 },
    IT: { total: 180, eligible: 165, placed: 35 },
    ECE: { total: 150, eligible: 120, placed: 15 },
    EE: { total: 100, eligible: 85, placed: 5 },
    ME: { total: 90, eligible: 60, placed: 2 },
    CE: { total: 50, eligible: 30, placed: 0 },
  },
  applicationPerStudent: 4.2,
  interviewSuccessRate: 32,
  placementReadinessScore: 68,
  cgpaDistribution: [
    { range: "9.0-10.0", count: 85 },
    { range: "8.0-8.9", count: 210 },
    { range: "7.0-7.9", count: 280 },
    { range: "6.0-6.9", count: 175 },
    { range: "Below 6.0", count: 100 },
  ],
  skillsGap: [
    { skill: "DSA", readiness: 72 },
    { skill: "System Design", readiness: 45 },
    { skill: "Communication", readiness: 68 },
    { skill: "Problem Solving", readiness: 75 },
    { skill: "Technical Writing", readiness: 52 },
  ],
};

export default function StudentsAnalyticsPage() {
  const placementRate = (
    (studentAnalytics.placed / studentAnalytics.eligible) *
    100
  ).toFixed(1);

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Students Analytics</h1>
            <p className="text-muted-foreground">
              Monitor student readiness and participation
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="2026">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold">
                    {studentAnalytics.totalRegistered}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700">Eligible</p>
                  <p className="text-3xl font-bold text-emerald-700">
                    {studentAnalytics.eligible}
                  </p>
                  <p className="text-xs text-emerald-600">
                    {(
                      (studentAnalytics.eligible /
                        studentAnalytics.totalRegistered) *
                      100
                    ).toFixed(0)}
                    % of total
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/30">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-700">Placed</p>
                  <p className="text-3xl font-bold text-amber-700">
                    {studentAnalytics.placed}
                  </p>
                  <p className="text-xs text-amber-600">
                    {placementRate}% placement rate
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-amber-100">
                  <GraduationCap className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Interview Success
                  </p>
                  <p className="text-3xl font-bold">
                    {studentAnalytics.interviewSuccessRate}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Branch-wise Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Branch-wise Participation
            </CardTitle>
            <CardDescription>
              Student distribution and placement by branch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(studentAnalytics.branchWise).map(
                ([branch, data]) => (
                  <div key={branch} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="w-12 justify-center"
                        >
                          {branch}
                        </Badge>
                        <span className="text-muted-foreground">
                          {data.total} students • {data.eligible} eligible
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-emerald-600">
                          {data.placed} placed
                        </span>
                        <span className="text-muted-foreground">
                          ({((data.placed / data.eligible) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 h-3">
                      <div
                        className="bg-emerald-500 rounded-l"
                        style={{
                          width: `${(data.placed / data.total) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-blue-500"
                        style={{
                          width: `${((data.eligible - data.placed) / data.total) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-gray-200 rounded-r"
                        style={{
                          width: `${((data.total - data.eligible) / data.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ),
              )}
              <div className="flex items-center gap-4 pt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Placed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-blue-500" />
                  <span>Eligible (Unplaced)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-gray-200" />
                  <span>Ineligible</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* CGPA Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                CGPA Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentAnalytics.cgpaDistribution.map((item) => (
                <div key={item.range} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.range}</span>
                    <span className="font-medium">{item.count} students</span>
                  </div>
                  <Progress
                    value={
                      (item.count / studentAnalytics.totalRegistered) * 100
                    }
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills Readiness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Skills Readiness
              </CardTitle>
              <CardDescription>
                Average readiness scores across key skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentAnalytics.skillsGap.map((item) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.skill}</span>
                    <span
                      className={`font-medium ${
                        item.readiness >= 70
                          ? "text-emerald-600"
                          : item.readiness >= 50
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {item.readiness}%
                    </span>
                  </div>
                  <Progress
                    value={item.readiness}
                    className={`h-2 ${
                      item.readiness >= 70
                        ? "[&>div]:bg-emerald-500"
                        : item.readiness >= 50
                          ? "[&>div]:bg-amber-500"
                          : "[&>div]:bg-red-500"
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Placement Readiness Score */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Overall Placement Readiness
                </h3>
                <p className="text-sm text-muted-foreground">
                  Based on profiles, skills, and mock interview performance
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="8"
                      fill="none"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${studentAnalytics.placementReadinessScore * 2.51} 251`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {studentAnalytics.placementReadinessScore}%
                    </span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Good progress!</p>
                  <p className="text-muted-foreground">
                    {100 - studentAnalytics.placementReadinessScore}% gap to
                    close
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
