export type NotificationType = "rent" | "leave" | "payment" | "report";

export interface NotificationModel {
  id: number;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}
