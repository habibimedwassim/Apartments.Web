import api from "@/app/api/base.api";
import {
  mapToOwnerDashboardData,
  OwnerDashboardData,
} from "@/app/models/dashboard.models";

export const getOwnerDashboard = async (): Promise<OwnerDashboardData> => {
  const response = await api.get<OwnerDashboardData>(`/users/me/dashboard`);
  return mapToOwnerDashboardData(response.data);
};
