import api from "@/app/api/base.api";
import { NotificationModel } from "../models/notification.models";

export const getUnread = async (): Promise<NotificationModel[]> => {
  console.log("Api Notifications triggered");
  const response = await api.get<NotificationModel[]>("notifications");
  return response.data;
};

export const markAsRead = async (type: string): Promise<void> => {
  await api.post(`/notifications?type=${type}`);
};
