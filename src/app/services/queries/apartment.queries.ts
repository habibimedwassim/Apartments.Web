import { useQuery } from "@tanstack/react-query";
import {
  getMyApartments,
  getApartmentById,
  getApartmentPhotos,
  getApartmentPhoto,
} from "@/app/api/apartment.api";
import {
  ApartmentModel,
  ApartmentPhotoModel,
} from "@/app/models/apartment.models";

// Query to get all apartments for the current user
export const useGetApartmentsQuery = () => {
  return useQuery({
    queryKey: ["apartments"],
    queryFn: getMyApartments,
    staleTime: 300000, // 5 minutes
  });
};

// Query to get an apartment by its ID
export const useGetApartmentByIdQuery = (id: number) => {
  return useQuery<ApartmentModel>({
    queryKey: ["apartment", id],
    queryFn: () => getApartmentById(id),
  });
};

// Query to get apartment photos by apartment ID
export const useGetApartmentPhotosQuery = (apartmentId: number) => {
  return useQuery<ApartmentPhotoModel[]>({
    queryKey: ["apartmentPhotos", apartmentId],
    queryFn: () => getApartmentPhotos(apartmentId),
    staleTime: 300000, // 5 minutes
  });
};

// Query to get a single apartment photo by apartment ID and photo ID
export const useGetApartmentPhotoQuery = (
  apartmentId: number,
  photoId: number
) => {
  return useQuery<ApartmentPhotoModel>({
    queryKey: ["apartmentPhoto", apartmentId, photoId],
    queryFn: () => getApartmentPhoto(apartmentId, photoId),
  });
};
