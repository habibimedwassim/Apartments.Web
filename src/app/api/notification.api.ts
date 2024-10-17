import api from "@/app/api/base.api";
import { NotificationModel } from "../models/notification.models";

export const getUnread = async (): Promise<NotificationModel[]> => {
  const response = await api.get<NotificationModel[]>("notifications");
  return response.data;
};

export const markAsRead = async (): Promise<void> => {
  await api.post("/notifications");
};
