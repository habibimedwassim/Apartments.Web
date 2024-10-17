import { getUnread, markAsRead } from "@/app/api/notification.api";
import { useQuery } from "@tanstack/react-query";

export const useGetUnreadNotificationsQuery = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getUnread,
    staleTime: 300000,
  });
};

// export const useMarkAsReadNotificationsQuery = () => {
//   return useQuery({
//     queryKey: ["notifications"],
//     queryFn: markAsRead,
//     staleTime: 300000,
//   });
// };
