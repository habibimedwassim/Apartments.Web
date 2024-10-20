import api from "@/app/api/base.api";
import { OwnerDashboardData } from "@/app/models/dashboard.models";

// Fetch the owner dashboard data
export const getOwnerDashboard = async (): Promise<OwnerDashboardData> => {
  const response = await api.get<OwnerDashboardData>(`/users/me/dashboard`);
  return response.data;
};
