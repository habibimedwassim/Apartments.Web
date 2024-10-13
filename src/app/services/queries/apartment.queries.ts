import { useQuery } from "@tanstack/react-query";
import { getMyApartments, getApartmentById } from "@/app/api/apartment.api";
import {
  ApartmentModel,
  ApartmentResponseModel,
} from "@/app/models/apartment.models";

// Query to get all apartments for the current user
export const useGetApartments = () => {
  return useQuery({
    queryKey: ["apartments"],
    queryFn: getMyApartments,
    staleTime: 300000, // 5 minutes
  });
};

// Query to get an apartment by its ID
export const useGetApartmentById = (id: number) => {
  return useQuery<ApartmentModel>({
    queryKey: ["apartment", id],
    queryFn: () => getApartmentById(id),
  });
};
