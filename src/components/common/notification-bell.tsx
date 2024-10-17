import { useEffect } from "react";
import { Bell, Check } from "lucide-react";
import { useNotificationStore } from "@/hooks/use-store";
import { useGetUnreadNotificationsQuery } from "@/app/services/queries/notification.queries";
import { NotificationBadge } from "./notification-badge";
import { useMarkAsReadMutation } from "@/app/services/mutations/notification.mutations";

export const NotificationBell = () => {
  return (
    <div className="relative">
      {/* Bell icon with notification count */}
      <button className="relative">
        <Bell className="h-6 w-6" />
        {"123".length > 0 && (
          <NotificationBadge
            count={5}
            className="absolute top-0 right-0 h-4 w-4"
          ></NotificationBadge>
        )}
      </button>
    </div>
  );
};
