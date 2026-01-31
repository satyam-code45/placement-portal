import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationApi } from "../api/application.api";
import type { ApplicationStatus } from "../types";

export function useApplications(status?: ApplicationStatus) {
  return useQuery({
    queryKey: ["applications", status],
    queryFn: () => status ? applicationApi.getApplicationsByStatus(status) : applicationApi.getApplications(),
  });
}

export function useApplicationById(id: string) {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => applicationApi.getApplicationById(id),
    enabled: !!id,
  });
}

export function useApplyToJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => applicationApi.applyToJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["hasApplied"] });
    },
  });
}

export function useHasApplied(jobId: string) {
  return useQuery({
    queryKey: ["hasApplied", jobId],
    queryFn: () => applicationApi.hasApplied(jobId),
    enabled: !!jobId,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: applicationApi.getDashboardStats,
  });
}

export function useRecentJobs(limit = 5) {
  return useQuery({
    queryKey: ["dashboard", "recentJobs", limit],
    queryFn: () => applicationApi.getRecentJobs(limit),
  });
}