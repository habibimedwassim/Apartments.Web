import { createUserReport, updateReport } from "@/app/api/report.api";
import { UpdateUserReportModel } from "@/app/models/report.models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sent-reports"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};

export const useUpdateReportMutation = (reportType: "sent" | "received") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserReportModel }) =>
      updateReport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${reportType}-reports`] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};
