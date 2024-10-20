import { useQuery } from "@tanstack/react-query";
import { getOwnerDashboard } from "@/app/api/dashboard.api";
import { OwnerDashboardData } from "@/app/models/dashboard.models";

// Query for fetching owner dashboard data
export const useGetOwnerDashboardQuery = () => {
  return useQuery<OwnerDashboardData>({
    queryKey: ["ownerDashboard"],
    queryFn: () => getOwnerDashboard(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
