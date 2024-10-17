import { useQuery } from "@tanstack/react-query";
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

// Query to get a specific apartment request by its ID
export const useGetApartmentRequestByIdQuery = (id: number) => {
  return useQuery<ApartmentRequestModel>({
    queryKey: ["apartmentRequest", id],
    queryFn: () => getApartmentRequestById(id),
  });
};

// Query to get all apartment requests for the current owner (filtered)
// export const useGetApartmentRequestsQuery = (
//   filters: ApartmentRequestQueryFilterModel
// ) => {
//   return useQuery<ApartmentRequestModel[]>({
//     queryKey: ["apartmentRequests", filters],
//     queryFn: () => getApartmentRequests(filters),
//     staleTime: 300000, // 5 minutes
//   });
// };

// Query to get tenant information associated with a specific request
export const useGetTenantFromRequestQuery = (id: number) => {
  return useQuery({
    queryKey: ["tenantFromRequest", id],
    queryFn: () => getTenantFromApartmentRequest(id),
  });
};

export const useGetApartmentRequestsQuery = (
  filter: ApartmentRequestQueryFilterModel
) => {
  return useQuery<ApartmentRequestModel[]>({
    queryKey: [`${filter.type.toLowerCase()}-requests`],
    queryFn: () => getApartmentRequests(filter),
    staleTime: 300000, // 5 minutes
  });
};

export const useGetRentRequestsQuery = () =>
  useGetApartmentRequestsQuery({ type: REQUEST_TYPES.Rent });
export const useGetLeaveRequestsQuery = () =>
  useGetApartmentRequestsQuery({ type: REQUEST_TYPES.Leave });
export const useGetDismissRequestsQuery = () =>
  useGetApartmentRequestsQuery({ type: REQUEST_TYPES.Dismiss });
