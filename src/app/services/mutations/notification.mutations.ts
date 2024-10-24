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
        if (type == "rent" || type == "leave") {
          queryClient.invalidateQueries({ queryKey: [`${type}-requests`] });
        }
        if (type == "report") {
          queryClient.invalidateQueries({ queryKey: ["received-reports"] });
        }
        if (type == "payment") {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
        }
      }
    },
  });
};
