import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard, getOwnerDashboard } from "@/app/api/dashboard.api";
import {
  AdminDashboardData,
  OwnerDashboardData,
} from "@/app/models/dashboard.models";

export const useGetAdminDashboardQuery = () => {
  return useQuery<AdminDashboardData>({
    queryKey: ["adminDashboard"],
    queryFn: () => getAdminDashboard(),
  });
};

export const useGetOwnerDashboardQuery = () => {
  return useQuery<OwnerDashboardData>({
    queryKey: ["ownerDashboard"],
    queryFn: () => getOwnerDashboard(),
  });
};
