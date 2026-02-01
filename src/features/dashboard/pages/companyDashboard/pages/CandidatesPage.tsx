import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CandidatesPage() {
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      cgpa: 8.5,
      batch: "2024",
      branch: "Computer Science",
      skills: ["React", "Node.js", "Python"],
      applications: 2,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9876543211",
      cgpa: 9.0,
      batch: "2024",
      branch: "Information Technology",
      skills: ["Angular", "Java", "Spring Boot"],
      applications: 1,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 9876543212",
      cgpa: 8.8,
      batch: "2023",
      branch: "Computer Science",
      skills: ["Machine Learning", "Python", "TensorFlow"],
      applications: 3,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
        <p className="text-muted-foreground mt-1">
          Browse and search through all candidates
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, skills..."
            className="pl-10"
          />
        </div>
        <Button>Filter</Button>
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader>
              <CardTitle className="text-xl">{candidate.name}</CardTitle>
              <CardDescription className="space-y-1">
                <div>{candidate.email}</div>
                <div>{candidate.phone}</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">CGPA</div>
                  <div className="font-semibold">{candidate.cgpa}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Batch</div>
                  <div className="font-medium">{candidate.batch}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Applications</div>
                  <div className="font-medium">{candidate.applications}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Skills</div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Branch</div>
                <div className="text-sm font-medium">{candidate.branch}</div>
              </div>

              <Button className="w-full">View Full Profile</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
