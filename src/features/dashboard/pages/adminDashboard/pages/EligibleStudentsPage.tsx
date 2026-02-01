import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Users } from "lucide-react";
import { toast } from "sonner";

import { AdminLayout } from "../components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  studentJobMatchService,
  type JobSource,
} from "@/services/studentJobMatchService";

export default function EligibleStudentsPage() {
  const navigate = useNavigate();
  const params = useParams() as { jobSource?: string; jobId?: string };

  const jobSource = (params.jobSource as JobSource) || "job_intelligence";
  const jobId = Number(params.jobId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Awaited<
    ReturnType<typeof studentJobMatchService.getEligibleStudents>
  > | null>(null);

  const [maxScoreInput, setMaxScoreInput] = useState<string>("");
  const [maxScore, setMaxScore] = useState<number | undefined>(undefined);
  const [approvedOnly, setApprovedOnly] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!Number.isFinite(jobId) || jobId <= 0) {
      setError("Invalid job id");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await studentJobMatchService.getEligibleStudents({
          jobSource,
          jobId,
          limit: 200,
          maxScore,
          approvedOnly,
        });
        if (!cancelled) setData(res);
      } catch (e: unknown) {
        const err = e as {
          response?: { data?: { error?: unknown } };
          message?: unknown;
        };
        const msg =
          err?.response?.data?.error ??
          err?.message ??
          "Failed to load eligible students";
        if (!cancelled) setError(String(msg));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [jobId, jobSource, maxScore, approvedOnly, reloadKey]);

  const applyFilters = () => {
    const raw = maxScoreInput.trim();
    if (!raw) {
      setMaxScore(undefined);
      return;
    }
    const n = Number(raw);
    if (!Number.isFinite(n)) {
      toast.error("Enter a valid score");
      return;
    }
    setMaxScore(n);
  };

  const handleApprove = async (studentId: number) => {
    try {
      const resp = await studentJobMatchService.approveStudentForJob({
        jobSource,
        jobId,
        studentId,
      });
      if (!resp.success) {
        toast.error(resp.error || "Approval failed");
        return;
      }
      toast.success("Student approved for this job");
      setReloadKey((k) => k + 1);
    } catch (e: unknown) {
      const err = e as {
        response?: { data?: { error?: unknown } };
        message?: unknown;
      };
      const msg =
        err?.response?.data?.error ?? err?.message ?? "Approval failed";
      toast.error(String(msg));
    }
  };

  const matches = useMemo(() => {
    const rows = data?.matches || [];
    // API already sends sorted by matchScore desc; keep a deterministic sort here as well.
    return [...rows].sort(
      (a, b) => (b.match.matchScore || 0) - (a.match.matchScore || 0),
    );
  }, [data]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Eligible Students</h1>
            <p className="text-muted-foreground">
              Students matched for this job (sorted by match score)
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="font-semibold">Job</span>
                </div>
                <div className="text-lg font-bold">
                  {data?.job?.title || `Job #${jobId}`}
                </div>
                <div className="text-sm text-muted-foreground">
                  {data?.job?.companyName || ""}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline">Source: {jobSource}</Badge>
                  {typeof data?.job?.finalScore === "number" && (
                    <Badge variant="secondary">
                      FinalScore: {data?.job?.finalScore.toFixed(1)}
                    </Badge>
                  )}
                  {typeof data?.total === "number" && (
                    <Badge variant="secondary">Students: {data.total}</Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Max score
                    </span>
                    <Input
                      value={maxScoreInput}
                      onChange={(e) => setMaxScoreInput(e.target.value)}
                      placeholder="e.g. 60"
                      type="number"
                      className="h-9 w-32"
                    />
                    <Button size="sm" variant="outline" onClick={applyFilters}>
                      Apply
                    </Button>
                    {typeof maxScore === "number" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setMaxScoreInput("");
                          setMaxScore(undefined);
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant={approvedOnly ? "default" : "outline"}
                    onClick={() => setApprovedOnly((v) => !v)}
                  >
                    {approvedOnly ? "Approved Only" : "All (incl. unapproved)"}
                  </Button>
                </div>
              </div>

              {data?.job?.applyLink && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={data.job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Job Link
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 text-sm text-muted-foreground">Loading…</div>
            ) : error ? (
              <div className="p-6 text-sm text-red-600">{error}</div>
            ) : matches.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">
                No eligible students found yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Match Score</TableHead>
                    <TableHead className="text-right">Skill</TableHead>
                    <TableHead className="text-right">ATS</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Approval</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.map((row, idx) => (
                    <TableRow key={row.match.id}>
                      <TableCell className="text-muted-foreground">
                        {idx + 1}
                      </TableCell>

                      <TableCell>
                        <div className="font-medium">{row.student.name}</div>
                        <div className="text-xs text-muted-foreground">
                          #{row.student.id}
                        </div>
                      </TableCell>

                      <TableCell className="text-sm">
                        {row.student.email}
                      </TableCell>

                      <TableCell className="text-right font-semibold">
                        {Number(row.match.matchScore || 0).toFixed(1)}
                      </TableCell>

                      <TableCell className="text-right">
                        {typeof row.match.skillMatchScore === "number"
                          ? row.match.skillMatchScore.toFixed(1)
                          : "-"}
                      </TableCell>

                      <TableCell className="text-right">
                        {typeof row.match.atsScore === "number"
                          ? row.match.atsScore.toFixed(1)
                          : "-"}
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(row.student.skills || []).slice(0, 6).map((s) => (
                            <Badge
                              key={s}
                              variant="secondary"
                              className="text-xs"
                            >
                              {s}
                            </Badge>
                          ))}
                          {(row.student.skills || []).length > 6 && (
                            <Badge variant="secondary" className="text-xs">
                              +{(row.student.skills || []).length - 6}
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          {row.student.isActive ? (
                            <Badge className="bg-green-100 text-green-700">
                              Active
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700">
                              Inactive
                            </Badge>
                          )}
                          {row.student.isPlaced && (
                            <Badge className="bg-yellow-100 text-yellow-700">
                              Placed
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        {row.match.approved ? (
                          <Badge variant="secondary">Approved</Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(row.student.id)}
                          >
                            Approve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
