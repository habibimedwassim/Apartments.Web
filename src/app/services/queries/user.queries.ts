import { useQuery } from "@tanstack/react-query";
import { getMyProfile, getMyTenants, getTenantById } from "@/app/api/user.api";
import { TenantModel, UserModel } from "@/app/models/user.models";

export const useGetUserProfileQuery = () => {
  return useQuery<UserModel>({
    queryKey: ["user-details"],
    queryFn: getMyProfile,
  });
};

export const useGetTenantsQuery = () => {
  return useQuery<TenantModel[]>({
    queryKey: ["tenants"],
    queryFn: getMyTenants,
    staleTime: 300000,
  });
};

export const useGetTenantByIdQuery = (id: number) => {
  return useQuery<TenantModel>({
    queryKey: ["tenants", id],
    queryFn: () => getTenantById(id),
  });
};
