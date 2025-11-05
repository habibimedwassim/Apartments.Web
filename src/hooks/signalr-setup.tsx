import { useEffect } from "react";
import { useNotificationStore } from "./use-store";
import { getSignalRConnection } from "./notifications";
import { useAuthStore } from "./use-store";
import { NotificationModel } from "@/app/models/notification.models";
import { useToast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { REQUEST_TYPES } from "@/app/constants/request";
import { HubConnectionBuilder } from "@microsoft/signalr";

const HUB_URL = (import.meta.env.VITE_SIGNALR_URL as string) ?? '';

const useSignalRNotification = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { toast } = useToast();
  const token = useAuthStore((state) => state.token);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const connection = new HubConnectionBuilder()
      .withUrl(HUB_URL)
      .build();

    connection.on("ReceiveNotification", (notification: NotificationModel) => {
      toast({
        description: notification.message,
        duration: 4000,
      });

      addNotification(notification);

      switch (notification.type.toLowerCase()) {
        case REQUEST_TYPES.Rent:
          queryClient.invalidateQueries({ queryKey: ["rent-requests"] });
          break;
        case REQUEST_TYPES.Leave:
          queryClient.invalidateQueries({ queryKey: ["leave-requests"] });
          break;
        case REQUEST_TYPES.Report:
          queryClient.invalidateQueries({ queryKey: ["received-reports"] });
          break;
        case REQUEST_TYPES.Payment:
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          break;
        default:
          break;
      }

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      connection.off("ReceiveNotification");
    };
  }, [isAuthenticated, token, addNotification]);
  return null;
};

export default useSignalRNotification;
