import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, Calendar, TrendingUp } from "lucide-react";

export default function CompanyDashboardPage() {
  const stats = [
    {
      title: "Active Jobs",
      value: "5",
      icon: Briefcase,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "Total Applicants",
      value: "128",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Interviews Scheduled",
      value: "12",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Hired This Month",
      value: "8",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your recruitment activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Recent Applications</h3>
            <div className="space-y-3">
              {[
                {
                  name: "John Doe",
                  role: "Backend Engineer",
                  time: "2 hours ago",
                },
                {
                  name: "Jane Smith",
                  role: "Frontend Developer",
                  time: "5 hours ago",
                },
                {
                  name: "Mike Johnson",
                  role: "Full Stack Developer",
                  time: "1 day ago",
                },
              ].map((app, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-sm text-muted-foreground">{app.role}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{app.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Upcoming Interviews</h3>
            <div className="space-y-3">
              {[
                {
                  name: "Sarah Williams",
                  role: "Data Scientist",
                  date: "Today, 3:00 PM",
                },
                {
                  name: "Tom Brown",
                  role: "DevOps Engineer",
                  date: "Tomorrow, 11:00 AM",
                },
                {
                  name: "Emily Davis",
                  role: "Product Manager",
                  date: "Jan 15, 2:00 PM",
                },
              ].map((interview, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{interview.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {interview.role}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {interview.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
