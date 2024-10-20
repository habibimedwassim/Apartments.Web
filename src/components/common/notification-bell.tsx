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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUnreadNotificationsQuery } from "@/app/services/queries/notification.queries";
import { useNotificationStore } from "@/hooks/use-store";
import { useMarkAsReadMutation } from "@/app/services/mutations/notification.mutations";
import { useEffect } from "react";
import { NotificationType } from "@/app/models/notification.models";
import { useNavigate } from "react-router-dom";

export function NotificationBell() {
  const { notifications, unreadCounts, fetchUnreadNotifications, markAsRead } =
    useNotificationStore();
  const { data: unreadNotificationsFromAPI } = useGetUnreadNotificationsQuery();
  const mutation = useMarkAsReadMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (unreadNotificationsFromAPI) {
      fetchUnreadNotifications(unreadNotificationsFromAPI);
    }
  }, [unreadNotificationsFromAPI, fetchUnreadNotifications]);

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
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative h-8 w-8 rounded-full mr-2"
            >
              <Bell className="w-5 h-5" />
              {totalUnread > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {totalUnread > 99 ? "99+" : totalUnread}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <TooltipContent side="bottom">Notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        className="p-0 w-80 max-h-[400px] overflow-auto"
        align="end"
        forceMount
      >
        <Card className="shadow-none border-0">
          <CardHeader className="border-b">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {totalUnread > 0
                ? `You have ${totalUnread} unread ${
                    totalUnread === 1 ? "notification" : "notifications"
                  }.`
                : "No unread notifications."}
            </CardDescription>
          </CardHeader>
          {totalUnread > 0 && (
            <CardContent className="p-2">
              <ScrollArea className="h-64 w-full">
                {notifications.length > 0 &&
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="mb-4 p-2 grid grid-cols-[auto_1fr] items-start gap-4 pb-4 last:mb-0 last:pb-0 cursor-pointer hover:bg-muted rounded-lg"
                      onClick={() =>
                        handleNotificationClick(
                          notification.type as NotificationType
                        )
                      }
                    >
                      <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium mb-2">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))}
              </ScrollArea>
            </CardContent>
          )}
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
