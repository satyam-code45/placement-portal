import {
  Building2,
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  Users,
  Clock,
  RefreshCw,
  ArrowUpRight,
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
const companyAnalytics = {
  companiesContacted: 85,
  companiesResponded: 52,
  conversionRate: 61,
  avgHiringCycleTime: 28, // days
  totalHires: 142,
  domainWise: {
    Technology: { companies: 35, hires: 95 },
    "IT Services": { companies: 25, hires: 35 },
    Finance: { companies: 12, hires: 8 },
    Consulting: { companies: 8, hires: 4 },
    Manufacturing: { companies: 5, hires: 0 },
  },
  topCompanies: [
    { name: "TCS", hires: 100, visits: 3 },
    { name: "Amazon", hires: 20, visits: 2 },
    { name: "Microsoft", hires: 15, visits: 2 },
    { name: "Google", hires: 12, visits: 1 },
    { name: "Infosys", hires: 80, visits: 2 },
  ],
  monthlyTrend: [
    { month: "Aug", contacted: 15, responded: 8 },
    { month: "Sep", contacted: 20, responded: 12 },
    { month: "Oct", contacted: 25, responded: 18 },
    { month: "Nov", contacted: 15, responded: 10 },
    { month: "Dec", contacted: 10, responded: 4 },
  ],
  returningRecruiters: 28,
  newRecruiters: 24,
  packageTrends: [
    { range: "30L+", count: 5 },
    { range: "20-30L", count: 12 },
    { range: "10-20L", count: 25 },
    { range: "5-10L", count: 40 },
    { range: "Below 5L", count: 60 },
  ],
};

export default function CompanyAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Company Analytics</h1>
            <p className="text-muted-foreground">
              Strategic placement planning and recruiter insights
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
                    Companies Contacted
                  </p>
                  <p className="text-3xl font-bold">
                    {companyAnalytics.companiesContacted}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-100">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700">Responded</p>
                  <p className="text-3xl font-bold text-emerald-700">
                    {companyAnalytics.companiesResponded}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>{companyAnalytics.conversionRate}% conversion</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-100">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Avg Hiring Cycle
                  </p>
                  <p className="text-3xl font-bold">
                    {companyAnalytics.avgHiringCycleTime}
                  </p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-100">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Hires</p>
                  <p className="text-3xl font-bold">
                    {companyAnalytics.totalHires}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recruiter Stats */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-blue-200 bg-blue-50/30">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Returning Recruiters</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {companyAnalytics.returningRecruiters}
                  </p>
                  <p className="text-xs text-blue-600">
                    Companies that hired before
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-100">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/30">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">New Recruiters</p>
                  <p className="text-3xl font-bold text-purple-700">
                    {companyAnalytics.newRecruiters}
                  </p>
                  <p className="text-xs text-purple-600">
                    First-time campus visitors
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Domain-wise Hiring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Domain-wise Hiring
              </CardTitle>
              <CardDescription>
                Company distribution by industry domain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(companyAnalytics.domainWise).map(
                ([domain, data]) => (
                  <div key={domain} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{domain}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {data.companies} companies
                        </span>
                        <Badge variant="secondary">{data.hires} hires</Badge>
                      </div>
                    </div>
                    <Progress
                      value={
                        (data.companies / companyAnalytics.companiesContacted) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                ),
              )}
            </CardContent>
          </Card>

          {/* Top Hiring Companies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Hiring Companies
              </CardTitle>
              <CardDescription>
                Companies with most hires this season
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companyAnalytics.topCompanies.map((company, index) => (
                  <div
                    key={company.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {company.visits} campus visit
                          {company.visits > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">{company.hires} hires</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Package Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Package Distribution
            </CardTitle>
            <CardDescription>
              Distribution of offers by CTC range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-4 px-4">
              {companyAnalytics.packageTrends.map((item) => (
                <div
                  key={item.range}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <span className="text-sm font-medium">{item.count}</span>
                  <div
                    className="w-full bg-primary/80 rounded-t-md transition-all hover:bg-primary"
                    style={{
                      height: `${(item.count / 70) * 100}%`,
                      minHeight: "20px",
                    }}
                  />
                  <span className="text-xs text-muted-foreground text-center">
                    {item.range}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Outreach Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Outreach Trend</CardTitle>
            <CardDescription>
              Companies contacted vs responded over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companyAnalytics.monthlyTrend.map((item) => (
                <div key={item.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium w-12">{item.month}</span>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span>{item.contacted} contacted</span>
                      <span className="text-emerald-600">
                        {item.responded} responded
                      </span>
                      <span>
                        ({((item.responded / item.contacted) * 100).toFixed(0)}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-3">
                    <div
                      className="bg-emerald-500 rounded-l"
                      style={{
                        width: `${(item.responded / item.contacted) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-gray-200 rounded-r"
                      style={{
                        width: `${((item.contacted - item.responded) / item.contacted) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
