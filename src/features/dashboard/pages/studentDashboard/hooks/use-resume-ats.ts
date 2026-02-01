import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

/* ================= Types ================= */

export interface ResumeATSRun {
  id: number;
  resumeUrl: string;
  resumeId?: number | null;

  overallScore: number;
  summary?: string | null;

  strengths: string[];
  weaknesses: string[];
  recommendations: string[];

  keywordMatch: Record<string, unknown>;

  modelUsed: string;
  success: boolean;
  error?: string | null;

  createdAt: string;
}

/* ================= API ================= */

const fetchResumeATSRuns = async (): Promise<ResumeATSRun[]> => {
  const res = await api.get<{
    success: boolean;
    data: ResumeATSRun[];
  }>("/student/resume/ats-runs");

  return res.data.data;
};

/* ================= Hook ================= */

export function useResumeATSRuns() {
  const query = useQuery({
    queryKey: ["student", "resumeATS"],
    queryFn: fetchResumeATSRuns,
  });

  return {
    atsRuns: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}