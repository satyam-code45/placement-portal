import { useRef } from "react";
import {
  Upload,
  FileText,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { AppLayout } from "../component/layout";
import { useResume, useResumeCompleteness } from "../hooks/useStudent";
import { useResumeATSRuns } from "../hooks/use-resume-ats";


export default function ResumePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    resume,
    isLoading,
    uploadResume,
    isUploading,
    deleteResume,
    isDeleting,
  } = useResume();
  const { data: completeness } = useResumeCompleteness();

     const { atsRuns, isLoading:resumeAtsLoading } = useResumeATSRuns();

if (resumeAtsLoading) return <Skeleton />;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Invalid file type", {
        description: "Please upload a PDF file",
      });
      return;
    }

    uploadResume(file, {
      onSuccess: () => {
        toast.success("Resume uploaded successfully!");
      },
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (isLoading)
    return (
      <AppLayout>
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-64" />
        </div>
      </AppLayout>
    );

  return (
    <AppLayout>
      <div className="max-w-2xl space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Resume Management</h1>

        {completeness && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Resume Completeness Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Progress value={completeness.score} className="flex-1 h-3" />
                <span className="font-bold text-lg">{completeness.score}%</span>
              </div>
              {completeness.suggestions.length > 0 && (
                <div className="space-y-2">
                  {completeness.suggestions.map((s, i) => (
                    <Alert
                      key={i}
                      variant={
                        completeness.score < 70 ? "destructive" : "default"
                      }
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{s}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
              {completeness.score === 100 && (
                <Alert>
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertDescription>
                    Your profile and resume are complete!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Your Resume</CardTitle>
            <CardDescription>Upload your resume in PDF format</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            {resume ? (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{resume.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(resume.fileSize)} • Updated{" "}
                        {formatDistanceToNow(new Date(resume.updatedAt))} ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Replace"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteResume()}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="border-2 border-dashed rounded-lg p-12 text-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium mb-1">Click to upload your resume</p>
                <p className="text-sm text-muted-foreground">
                  PDF format only, max 5MB
                </p>
                <Button className="mt-4" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload Resume"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

     

{atsRuns?.map((run) => (
  <div key={run.id}>
    <p>Score: {run.overallScore}%</p>
    <p>{run.summary}</p>
  </div>
))}

      </div>
    </AppLayout>
  );
}