import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Briefcase,
  MapPin,
  DollarSign,
  GraduationCap,
  Building2,
  Plus,
  X,
} from "lucide-react";

export default function PostJobPage() {
  const [eligibleBatches, setEligibleBatches] = useState<string[]>([]);
  const [eligibleDegrees, setEligibleDegrees] = useState<string[]>([]);
  const [newBatch, setNewBatch] = useState("");
  const [newDegree, setNewDegree] = useState("");

  const addBatch = () => {
    if (newBatch && !eligibleBatches.includes(newBatch)) {
      setEligibleBatches([...eligibleBatches, newBatch]);
      setNewBatch("");
    }
  };

  const removeBatch = (batch: string) => {
    setEligibleBatches(eligibleBatches.filter((b) => b !== batch));
  };

  const addDegree = () => {
    if (newDegree && !eligibleDegrees.includes(newDegree)) {
      setEligibleDegrees([...eligibleDegrees, newDegree]);
      setNewDegree("");
    }
  };

  const removeDegree = (degree: string) => {
    setEligibleDegrees(eligibleDegrees.filter((d) => d !== degree));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Job Posting
        </h1>
        <p className="text-muted-foreground mt-1">
          Fill in the details to post a new job opportunity
        </p>
      </div>

      {/* Job Posting Form */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Job Details
          </CardTitle>
          <CardDescription>
            Complete all sections to create a comprehensive job posting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Basic Information
            </h3>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title *</Label>
                <Input id="job-title" placeholder="e.g., Backend Engineer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-role-category">Job Role Category *</Label>
                <Select>
                  <SelectTrigger id="job-role-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sde">
                      Software Development Engineer (SDE)
                    </SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                    <SelectItem value="frontend">Frontend Developer</SelectItem>
                    <SelectItem value="backend">Backend Developer</SelectItem>
                    <SelectItem value="fullstack">
                      Full Stack Developer
                    </SelectItem>
                    <SelectItem value="qa">QA/Testing</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="data">Data & Analytics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment-type">Employment Type *</Label>
                <Select>
                  <SelectTrigger id="employment-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seniority-level">Seniority Level *</Label>
                <Select>
                  <SelectTrigger id="seniority-level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid-level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="principal">Principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Describe the role, responsibilities, and requirements..."
                rows={4}
              />
            </div>
          </div>

          {/* Location & Work Mode */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location & Work Mode
            </h3>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="work-mode">Work Mode *</Label>
                <Select>
                  <SelectTrigger id="work-mode">
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Full address or area" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="e.g., Bangalore" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input id="state" placeholder="e.g., Karnataka" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  placeholder="e.g., India"
                  defaultValue="India"
                />
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Compensation
            </h3>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salary-min">Minimum Salary (₹/year)</Label>
                <Input
                  id="salary-min"
                  type="number"
                  placeholder="e.g., 600000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary-max">Maximum Salary (₹/year)</Label>
                <Input
                  id="salary-max"
                  type="number"
                  placeholder="e.g., 1200000"
                />
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Eligibility Criteria
            </h3>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              {/* Eligible Batches */}
              <div className="space-y-2">
                <Label>Eligible Batches *</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., 2024"
                    value={newBatch}
                    onChange={(e) => setNewBatch(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addBatch())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addBatch}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {eligibleBatches.map((batch) => (
                    <Badge key={batch} variant="secondary" className="gap-1">
                      {batch}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeBatch(batch)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Eligible Degrees */}
              <div className="space-y-2">
                <Label>Eligible Degrees *</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., B.Tech, M.Tech"
                    value={newDegree}
                    onChange={(e) => setNewDegree(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addDegree())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addDegree}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {eligibleDegrees.map((degree) => (
                    <Badge key={degree} variant="secondary" className="gap-1">
                      {degree}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeDegree(degree)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimum-cgpa">Minimum CGPA *</Label>
                <Input
                  id="minimum-cgpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="e.g., 7.5"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="backlog-allowed"
                  className="flex items-center justify-between"
                >
                  Backlog Allowed
                  <Switch id="backlog-allowed" />
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle to allow candidates with backlogs
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="work-auth"
                  className="flex items-center justify-between"
                >
                  Work Authorization Required
                  <Switch id="work-auth" />
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle if work authorization is required
                </p>
              </div>
            </div>
          </div>

          {/* Interview & Other Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Interview & Other Details</h3>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="interview-mode">Interview Mode *</Label>
                <Select>
                  <SelectTrigger id="interview-mode">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notice-period">
                  Notice Period Limit (days)
                </Label>
                <Input
                  id="notice-period"
                  type="number"
                  placeholder="e.g., 30"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Save as Draft</Button>
            <Button>Publish Job Posting</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
