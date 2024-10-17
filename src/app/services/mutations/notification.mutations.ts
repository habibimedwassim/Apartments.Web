import { markAsRead } from "@/app/api/notification.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
  return mutation;
};
