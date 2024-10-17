import { markAsRead } from "@/app/api/notification.api";
import { NotificationType } from "@/app/models/notification.models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (type: string) => markAsRead(type),
    onSuccess: (_, type: NotificationType) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      if (type) {
        queryClient.invalidateQueries({ queryKey: [`${type}-requests`] });
      }
    },
  });
};
