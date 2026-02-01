import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { studentApi } from "../api/student.api";
import type { Student } from "../types";
 

export function useStudentProfile() {
  const updateStudent = useAuthStore((state: { updateStudent: any; }) => state.updateStudent);

  const query = useQuery({
    queryKey: ["student", "profile"],
    queryFn: studentApi.getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: (updates: Partial<Student>) => studentApi.updateProfile(updates),
    onSuccess: (data) => {
      updateStudent(data);
    },
  });

  return {
    student: query.data,
    isLoading: query.isLoading,
    error: query.error,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}

export function useProfileCompletion() {
  return useQuery({
    queryKey: ["student", "profileCompletion"],
    queryFn: studentApi.getProfileCompletion,
  });
}

export function useResume() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["student", "resume"],
    queryFn: studentApi.getResume,
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => studentApi.uploadResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "resume"] });
      queryClient.invalidateQueries({ queryKey: ["student", "resumeCompleteness"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: studentApi.deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "resume"] });
      queryClient.invalidateQueries({ queryKey: ["student", "resumeCompleteness"] });
    },
  });

  return {
    resume: query.data,
    isLoading: query.isLoading,
    error: query.error,
    uploadResume: uploadMutation.mutate,
    isUploading: uploadMutation.isPending,
    deleteResume: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}

export function useResumeCompleteness() {
  return useQuery({
    queryKey: ["student", "resumeCompleteness"],
    queryFn: studentApi.checkResumeCompleteness,
  });
}

 