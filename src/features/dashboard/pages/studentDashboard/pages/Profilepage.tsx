import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Plus, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudentProfile } from "../hooks/useStudent";
import { toast } from "sonner";
import { AppLayout } from "../component/layout"; 


const profileSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  college: z.string().min(2),
  course: z.string().min(1),
  branch: z.string().min(1),

  batch: z.preprocess(
    (val) => Number(val),
    z.number().min(2020).max(2030)
  ),

  rollNumber: z.string().min(1),

  cgpa: z.preprocess(
    (val) => Number(val),
    z.number().min(0).max(10)
  ),

  hasBacklogs: z.boolean(),
});



type ProfileFormData = z.output<typeof profileSchema>;

export default function ProfilePage() {
  const { student, isLoading, updateProfile, isUpdating } = useStudentProfile();
  const [skills, setSkills] = useState<string[]>(student?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      college: "",
      course: "",
      branch: "",
      batch: 2024,
      rollNumber: "",
      cgpa: 0,
      hasBacklogs: false,
    },
  });


  useEffect(() => {
    if (student) {
      form.reset({
        fullName: student.fullName,
        email: student.email,
        phone: student.phone,
        college: student.college,
        course: student.course,
        branch: student.branch,
        batch: student.batch,
        rollNumber: student.rollNumber,
        cgpa: student.cgpa,
        hasBacklogs: student.hasBacklogs,
      });

      setSkills(student.skills ?? []);
    }
  }, [student, form]);


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
    updateProfile(
      { ...data, skills },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update profile");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <Card><CardContent className="p-6"><Skeleton className="h-96 w-full" /></CardContent></Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="college" render={({ field }) => (
                  <FormItem><FormLabel>College</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="course" render={({ field }) => (
                  <FormItem><FormLabel>Course</FormLabel><FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B.Tech">B.Tech</SelectItem>
                        <SelectItem value="M.Tech">M.Tech</SelectItem>
                        <SelectItem value="MCA">MCA</SelectItem>
                        <SelectItem value="BCA">BCA</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="branch" render={({ field }) => (
                  <FormItem><FormLabel>Branch</FormLabel><FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="batch" render={({ field }) => (
                  <FormItem><FormLabel>Batch</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="rollNumber" render={({ field }) => (
                  <FormItem><FormLabel>Roll Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="cgpa" render={({ field }) => (
                  <FormItem><FormLabel>CGPA</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="hasBacklogs" render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <FormLabel>Has Backlogs?</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
                  <Button type="button" onClick={addSkill}><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}><X className="h-3 w-3" /></button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button type="submit" disabled={isUpdating} className="w-full md:w-auto">
              <Save className="mr-2 h-4 w-4" />{isUpdating ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}