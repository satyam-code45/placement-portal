import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Save,
  Plus,
  X,
  User,
  Mail,
  Phone,
  Award,
  Link as LinkIcon,
  Calendar,
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { AppLayout } from "../component/layout";
import { useAuth } from "@/hooks/useAuth";
import { studentService } from "@/services/studentService";
import { useMutation } from "@tanstack/react-query";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  rollNo: z.string().optional(),
  graduationYear: z.number().min(2020).max(2035),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  activeBacklogs: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const updateMutation = useMutation({
    mutationFn: studentService.updateProfile,
    onSuccess: (response) => {
      // Update the user in auth context
      if (user) {
        login(localStorage.getItem("token") || "", {
          ...user,
          ...response.student,
        });
      }
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      rollNo: "",
      graduationYear: new Date().getFullYear(),
      portfolioUrl: "",
      linkedinUrl: "",
      activeBacklogs: false,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        rollNo: user.rollNo ?? "",
        graduationYear: user.graduationYear ?? new Date().getFullYear(),
        portfolioUrl: user.portfolioUrl ?? "",
        linkedinUrl: user.linkedinUrl ?? "",
        activeBacklogs: user.activeBacklogs ?? false,
      });
      setSkills(Array.isArray(user.skills) ? user.skills : []);
    }
  }, [user, form]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const onSubmit = (data: ProfileFormData) => {
    updateMutation.mutate({
      ...data,
      skills,
    });
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-96 w-full" />
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">
              Manage your personal information and preferences
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <Card className="border-2 border-gray-900 shadow-md">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <CardTitle>Personal Information</CardTitle>
                </div>
                <CardDescription>
                  Your basic details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 pt-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          disabled
                          className="bg-gray-50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+1234567890" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="border-2 border-gray-900 shadow-md">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <CardTitle>Academic Information</CardTitle>
                </div>
                <CardDescription>
                  Your educational details and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 pt-6">
                <FormField
                  control={form.control}
                  name="rollNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roll Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="STU2024001" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Graduation Year
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activeBacklogs"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border-2 border-gray-200 p-4 md:col-span-2">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Backlogs
                        </FormLabel>
                        <div className="text-sm text-gray-500">
                          Do you have any pending backlogs?
                        </div>
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
              </CardContent>
            </Card>

            {/* Professional Links */}
            <Card className="border-2 border-gray-900 shadow-md">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  <CardTitle>Professional Links</CardTitle>
                </div>
                <CardDescription>
                  Your portfolio and social profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 pt-6">
                <FormField
                  control={form.control}
                  name="portfolioUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://yourportfolio.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-2 border-gray-900 shadow-md">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Add your technical and soft skills
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., JavaScript, React, Python)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.length === 0 ? (
                    <p className="text-sm text-gray-500">No skills added yet</p>
                  ) : (
                    skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="gap-2 px-3 py-1 bg-gray-900 text-white hover:bg-gray-800"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={updateMutation.isPending}
              >
                Reset Changes
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                {updateMutation.isPending ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
