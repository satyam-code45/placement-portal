import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MyJobsPage() {
  const jobs = [
    {
      id: 1,
      title: "Backend Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Bangalore",
      applications: 45,
      status: "published",
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Mumbai",
      applications: 32,
      status: "published",
      postedDate: "5 days ago",
    },
    {
      id: 3,
      title: "Data Scientist",
      department: "Data & Analytics",
      type: "Full-time",
      location: "Hyderabad",
      applications: 28,
      status: "published",
      postedDate: "1 week ago",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      type: "Contract",
      location: "Remote",
      applications: 15,
      status: "draft",
      postedDate: "Just now",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "bg-green-100 text-green-800 border-green-200",
      draft: "bg-gray-100 text-gray-800 border-gray-200",
      closed: "bg-red-100 text-red-800 border-red-200",
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Job Postings</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your active and draft job postings
          </p>
        </div>
        <Button>Create New Job</Button>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <Badge
                      className={getStatusBadge(job.status)}
                      variant="outline"
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {job.department} • {job.type} • {job.location}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Job
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Job
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Applications:</span>{" "}
                    <span className="font-semibold">{job.applications}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Posted:</span>{" "}
                    <span className="font-medium">{job.postedDate}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Applications
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
