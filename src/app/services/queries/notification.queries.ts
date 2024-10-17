import { getUnread } from "@/app/api/notification.api";
import { useQuery } from "@tanstack/react-query";

export const useGetUnreadNotificationsQuery = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getUnread,
  });
};
