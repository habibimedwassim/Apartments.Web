import api from "@/app/api/base.api";
import {
  AdminDashboardData,
  mapToAdminDashboardData,
  mapToOwnerDashboardData,
  OwnerDashboardData,
} from "@/app/models/dashboard.models";

export const getAdminDashboard = async (): Promise<AdminDashboardData> => {
  const response = await api.get<AdminDashboardData>(`/admin/dashboard`);
  return mapToAdminDashboardData(response.data);
};

export const getOwnerDashboard = async (): Promise<OwnerDashboardData> => {
  const response = await api.get<OwnerDashboardData>(`/users/me/dashboard`);
  return mapToOwnerDashboardData(response.data);
};
