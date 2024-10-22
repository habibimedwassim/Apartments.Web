import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getApartmentRequestById,
  getApartmentRequests,
  getTenantFromApartmentRequest,
} from "@/app/api/apartment-request.api";
import {
  ApartmentRequestModel,
  ApartmentRequestQueryFilterModel,
} from "@/app/models/apartment-request.models";
import { REQUEST_TYPES } from "@/app/constants/request";

export const useGetApartmentRequestByIdQuery = (id: number) => {
  return useQuery<ApartmentRequestModel>({
    queryKey: ["apartmentRequest", id],
    queryFn: () => getApartmentRequestById(id),
  });
};

export const useGetTenantFromRequestQuery = (id: number) => {
  return useQuery({
    queryKey: ["tenantFromRequest", id],
    queryFn: () => getTenantFromApartmentRequest(id),
  });
};

export const useGetApartmentRequestsQuery = (
  filter: ApartmentRequestQueryFilterModel
) => {
  return useInfiniteQuery({
    queryKey: [`${filter.type}-requests`],
    queryFn: ({ pageParam = 1 }) =>
      getApartmentRequests({ ...filter, pageNumber: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetRentRequestsQuery = () =>
  useGetApartmentRequestsQuery({ type: REQUEST_TYPES.Rent, pageNumber: 1 });

export const useGetLeaveRequestsQuery = () =>
  useGetApartmentRequestsQuery({ type: REQUEST_TYPES.Leave, pageNumber: 1 });

export const useGetDismissRequestsQuery = () =>
  useGetApartmentRequestsQuery({ type: REQUEST_TYPES.Dismiss, pageNumber: 1 });
