import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUnreadNotificationsQuery } from "@/app/services/queries/notification.queries";
import { useNotificationStore } from "@/hooks/use-store";
import { useMarkAsReadMutation } from "@/app/services/mutations/notification.mutations";
import { useEffect } from "react";
import { NotificationType } from "@/app/models/notification.models";
import { useNavigate } from "react-router-dom";

// Notification Bell Component
export function NotificationBell() {
  const { notifications, unreadCounts, fetchUnreadNotifications, markAsRead } =
    useNotificationStore();
  const { data: unreadNotificationsFromAPI } = useGetUnreadNotificationsQuery();
  const mutation = useMarkAsReadMutation();
  const navigate = useNavigate();

  // Fetch and store unread notifications on mount
  useEffect(() => {
    if (unreadNotificationsFromAPI) {
      fetchUnreadNotifications(unreadNotificationsFromAPI);
    }
  }, [unreadNotificationsFromAPI, fetchUnreadNotifications]);

  // Get the total unread count
  const totalUnread = Object.values(unreadCounts).reduce(
    (total, count) => total + count,
    0
  );
  const markAsReadAndRedirect = (type: NotificationType) => {
    markAsRead(type);
    switch (type) {
      case "rent":
        navigate("/rental-requests");
        break;
      case "leave":
        navigate("/leave-requests");
        break;
      case "payment":
        navigate("/transactions");
        break;
      default:
        break;
    }
  };
  const handleNotificationClick = (type: NotificationType) => {
    mutation
      .mutateAsync(type)
      .then(() => {
        markAsReadAndRedirect(type);
      })
      .catch(() => {});
  };

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full bg-background mr-2"
                size="icon"
              >
                <Bell className="h-5 w-5" />
                {totalUnread > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {totalUnread > 99 ? "99+" : totalUnread}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        className="w-96 max-h-96 overflow-y-auto" // Wider (w-96) and smaller height (max-h-96)
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">Notifications</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-64 w-full rounded-md border">
          {" "}
          {/* Adjust the height to make it smaller */}
          <div className="p-4">
            {notifications.length ? (
              notifications.map((notification, index) => (
                <Card
                  key={index}
                  className="mb-4 cursor-pointer hover:bg-muted transition"
                  onClick={() =>
                    handleNotificationClick(
                      notification.type as NotificationType
                    )
                  }
                >
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      {notification.type.toUpperCase() + " Request"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{notification.message}</CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm">No unread notifications</p>
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
