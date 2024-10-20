import { useQuery } from "@tanstack/react-query";
import { getOwnerDashboard } from "@/app/api/dashboard.api";
import { OwnerDashboardData } from "@/app/models/dashboard.models";

export const useGetOwnerDashboardQuery = () => {
  return useQuery<OwnerDashboardData>({
    queryKey: ["ownerDashboard"],
    queryFn: () => getOwnerDashboard(),
  });
};
