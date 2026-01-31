import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobApi } from "../api/job.api";
import type { JobFilters } from "../types";
 
export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => jobApi.getJobs(filters),
  });
}

export function useJobById(id: string) {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => jobApi.getJobById(id),
    enabled: !!id,
  });
}

export function useCompanies() {
  return useQuery({
    queryKey: ["jobs", "companies"],
    queryFn: jobApi.getCompanies,
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["jobs", "locations"],
    queryFn: jobApi.getLocations,
  });
}

export function useSavedJobs() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["jobs", "saved"],
    queryFn: jobApi.getSavedJobs,
  });

  const savedJobsWithDetails = useQuery({
    queryKey: ["jobs", "savedWithDetails"],
    queryFn: jobApi.getSavedJobsWithDetails,
  });

  const saveMutation = useMutation({
    mutationFn: (jobId: string) => jobApi.saveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", "saved"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", "savedWithDetails"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: (jobId: string) => jobApi.unsaveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", "saved"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", "savedWithDetails"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return {
    savedJobs: query.data || [],
    savedJobsWithDetails: savedJobsWithDetails.data || [],
    isLoading: query.isLoading || savedJobsWithDetails.isLoading,
    saveJob: saveMutation.mutate,
    unsaveJob: unsaveMutation.mutate,
    isSaving: saveMutation.isPending,
    isUnsaving: unsaveMutation.isPending,
  };
}

export function useIsJobSaved(jobId: string) {
  return useQuery({
    queryKey: ["jobs", "saved", jobId],
    queryFn: () => jobApi.isJobSaved(jobId),
    enabled: !!jobId,
  });
}