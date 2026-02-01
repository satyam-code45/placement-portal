import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Mail, Phone } from "lucide-react";

export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      job: "Backend Engineer",
      cgpa: 8.5,
      batch: "2024",
      branch: "Computer Science",
      status: "pending",
      appliedDate: "2 days ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9876543211",
      job: "Frontend Developer",
      cgpa: 9.0,
      batch: "2024",
      branch: "Information Technology",
      status: "shortlisted",
      appliedDate: "3 days ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 9876543212",
      job: "Data Scientist",
      cgpa: 8.8,
      batch: "2023",
      branch: "Computer Science",
      status: "interviewed",
      appliedDate: "1 week ago",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      shortlisted: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      interviewed: "bg-purple-100 text-purple-800 border-purple-200",
      offered: "bg-green-100 text-green-800 border-green-200",
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage candidate applications
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{app.name}</CardTitle>
                      <Badge
                        className={getStatusBadge(app.status)}
                        variant="outline"
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2 space-y-1">
                      <div>
                        Applied for:{" "}
                        <span className="font-medium">{app.job}</span>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {app.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {app.phone}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">CGPA:</span>{" "}
                      <span className="font-semibold">{app.cgpa}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Branch:</span>{" "}
                      <span className="font-medium">{app.branch}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Batch:</span>{" "}
                      <span className="font-medium">{app.batch}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Applied:</span>{" "}
                      <span className="font-medium">{app.appliedDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                    <Button size="sm">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                No pending applications
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shortlisted">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                No shortlisted candidates
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviewed">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                No interviewed candidates
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
