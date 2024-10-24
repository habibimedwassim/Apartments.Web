import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMyProfile,
  getMyTenants,
  getTenantById,
  getUsers,
} from "@/app/api/user.api";
import { TenantModel, UserModel } from "@/app/models/user.models";
import { PagedResult } from "@/app/models/api.models";
import { USER_ROLE } from "@/app/constants/user-role";

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

export const useGetUsersQuery = (filter: {
  role?: string;
  pageNumber: number;
}) => {
  return useInfiniteQuery({
    queryKey: [`${filter.role ?? "All"}-users`],
    queryFn: ({ pageParam = 1 }) =>
      getUsers({ ...filter, pageNumber: pageParam }),
    getNextPageParam: (lastPage: PagedResult<UserModel>, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetAdminUsersQuery = () =>
  useGetUsersQuery({ role: USER_ROLE.ADMIN, pageNumber: 1 });

export const useGetOwnerUsersQuery = () =>
  useGetUsersQuery({ role: USER_ROLE.OWNER, pageNumber: 1 });

export const useGetTenantUsersQuery = () =>
  useGetUsersQuery({ role: USER_ROLE.USER, pageNumber: 1 });

export const useGetAllUsersQuery = () => useGetUsersQuery({ pageNumber: 1 });
