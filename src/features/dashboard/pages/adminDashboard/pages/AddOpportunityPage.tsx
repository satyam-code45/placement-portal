import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Building2,
  FileText,
  MapPin,
  Link as LinkIcon,
  Upload,
  DollarSign,
  GraduationCap,
  Plus,
  X,
  Briefcase,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AdminLayout } from "../components/layout";
import { toast } from "sonner";

const opportunitySchema = z.object({
  // Basic Information
  companyName: z.string().min(2, "Company name is required"),
  roleTitle: z.string().min(2, "Role title is required"),
  jobRoleCategory: z.string().min(1, "Job role category is required"),
  department: z.string().min(1, "Department is required"),
  type: z.enum(["full-time", "internship", "contract", "part-time"]),
  seniorityLevel: z.enum(["junior", "mid", "senior", "lead", "principal"]),
  description: z.string().min(10, "Description must be at least 10 characters"),

  // Location & Work Mode
  mode: z.enum(["remote", "on-site", "hybrid"]),
  location: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),

  // Compensation
  ctcMin: z.coerce.number().min(0),
  ctcMax: z.coerce.number().min(0),

  // Eligibility Criteria
  eligibleBatches: z.string().min(1, "At least one batch is required"),
  eligibleDegrees: z.string().min(1, "At least one degree is required"),
  minCgpa: z.coerce.number().min(0).max(10),
  backlogAllowed: z.boolean(),
  workAuthRequired: z.boolean(),
  requiredSkills: z.string().min(1, "At least one skill is required"),
  branches: z.string().min(1, "Select eligible branches"),

  // Interview & Other Details
  interviewMode: z.enum(["online", "offline", "hybrid"]),
  noticePeriodLimit: z.coerce.number().optional(),
  deadline: z.string().min(1, "Deadline is required"),

  // HR Contact
  hrName: z.string().optional(),
  hrEmail: z.string().email().optional().or(z.literal("")),
  hrPhone: z.string().optional(),

  // Additional
  applicationProcess: z.string().optional(),
  attachmentUrl: z.string().optional(),
});

type OpportunityFormData = z.infer<typeof opportunitySchema>;

export default function AddOpportunityPage() {
  const navigate = useNavigate();
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [eligibleBatches, setEligibleBatches] = useState<string[]>([]);
  const [eligibleDegrees, setEligibleDegrees] = useState<string[]>([]);
  const [newBatch, setNewBatch] = useState("");
  const [newDegree, setNewDegree] = useState("");

  const form = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      companyName: "",
      roleTitle: "",
      jobRoleCategory: "",
      department: "",
      type: "full-time",
      seniorityLevel: "junior",
      description: "",
      mode: "on-site",
      location: "",
      city: "",
      state: "",
      country: "India",
      ctcMin: 0,
      ctcMax: 0,
      eligibleBatches: "",
      eligibleDegrees: "",
      minCgpa: 6.0,
      backlogAllowed: false,
      workAuthRequired: false,
      requiredSkills: "",
      branches: "",
      interviewMode: "online",
      noticePeriodLimit: 0,
      deadline: "",
      hrName: "",
      hrEmail: "",
      hrPhone: "",
      applicationProcess: "",
      attachmentUrl: "",
    },
  });

  const branches = ["CSE", "IT", "ECE", "EE", "ME", "CE", "CH", "BT"];

  const toggleBranch = (branch: string) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch],
    );
    form.setValue("branches", selectedBranches.join(", "));
  };

  const addBatch = () => {
    if (newBatch && !eligibleBatches.includes(newBatch)) {
      const updated = [...eligibleBatches, newBatch];
      setEligibleBatches(updated);
      form.setValue("eligibleBatches", updated.join(", "));
      setNewBatch("");
    }
  };

  const removeBatch = (batch: string) => {
    const updated = eligibleBatches.filter((b) => b !== batch);
    setEligibleBatches(updated);
    form.setValue("eligibleBatches", updated.join(", "));
  };

  const addDegree = () => {
    if (newDegree && !eligibleDegrees.includes(newDegree)) {
      const updated = [...eligibleDegrees, newDegree];
      setEligibleDegrees(updated);
      form.setValue("eligibleDegrees", updated.join(", "));
      setNewDegree("");
    }
  };

  const removeDegree = (degree: string) => {
    const updated = eligibleDegrees.filter((d) => d !== degree);
    setEligibleDegrees(updated);
    form.setValue("eligibleDegrees", updated.join(", "));
  };

  const onSubmit = (data: OpportunityFormData) => {
    console.log({
      ...data,
      branches: selectedBranches,
      eligibleBatches: eligibleBatches,
      eligibleDegrees: eligibleDegrees,
    });
    toast.success("Opportunity added successfully!");
    navigate("/dashboard/admin/opportunities");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Opportunity</h1>
            <p className="text-muted-foreground">
              Create a new job or internship posting
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Enter the basic details of the opportunity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Google" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roleTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Backend Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobRoleCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Role Category *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sde">
                              Software Development Engineer (SDE)
                            </SelectItem>
                            <SelectItem value="data-science">
                              Data Science
                            </SelectItem>
                            <SelectItem value="devops">DevOps</SelectItem>
                            <SelectItem value="ml">Machine Learning</SelectItem>
                            <SelectItem value="frontend">
                              Frontend Developer
                            </SelectItem>
                            <SelectItem value="backend">
                              Backend Developer
                            </SelectItem>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="operations">
                              Operations
                            </SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="data">
                              Data & Analytics
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="internship">
                              Internship
                            </SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seniorityLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seniority Level *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="mid">Mid-level</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="lead">Lead</SelectItem>
                            <SelectItem value="principal">Principal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[120px]"
                          placeholder="Describe the role and responsibilities..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Location & Work Mode */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Work Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Mode *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="on-site">On-site</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full address or area"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Bangalore" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Karnataka" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., India" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadline *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Compensation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Compensation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="ctcMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {form.watch("type") === "internship"
                            ? "Min Stipend (₹/month)"
                            : "Min Salary (₹/year)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 600000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ctcMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {form.watch("type") === "internship"
                            ? "Max Stipend (₹/month)"
                            : "Max Salary (₹/year)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 1200000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Eligible Batches */}
                <div>
                  <FormLabel>Eligible Batches *</FormLabel>
                  <div className="flex gap-2 mt-2">
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
                <div>
                  <FormLabel>Eligible Degrees *</FormLabel>
                  <div className="flex gap-2 mt-2">
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

                {/* Eligible Branches */}
                <div>
                  <FormLabel>Eligible Branches *</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {branches.map((branch) => (
                      <Badge
                        key={branch}
                        variant={
                          selectedBranches.includes(branch)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => toggleBranch(branch)}
                      >
                        {branch}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Click to select/deselect branches
                  </p>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="minCgpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum CGPA *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requiredSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Skills *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., JavaScript, Python, React"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Comma-separated list</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="backlogAllowed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Backlog Allowed
                          </FormLabel>
                          <FormDescription>
                            Allow candidates with backlogs
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workAuthRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Work Authorization Required
                          </FormLabel>
                          <FormDescription>
                            Requires work authorization
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interview & Other Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Interview & Other Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="interviewMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interview Mode *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noticePeriodLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notice Period Limit (days)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* HR Contact (Optional) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  HR Contact (Optional)
                </CardTitle>
                <CardDescription>
                  Add recruiter contact details if available
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="hrName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HR Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Priya Sharma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hrEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HR Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="hr@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hrPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HR Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91-XXXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="applicationProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Process</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[80px]"
                          placeholder="Describe the selection process (rounds, tests, etc.)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attachmentUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attachment URL (PDF/Link)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Link to job description PDF or external posting
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Upload className="mr-2 h-4 w-4" />
                Add Opportunity
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
