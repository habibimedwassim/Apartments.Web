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

export const useGetApartmentsQuery = () => {
  return useQuery({
    queryKey: ["apartments"],
    queryFn: getMyApartments,
    staleTime: 300000,
  });
};

export const useGetApartmentByIdQuery = (id: number) => {
  return useQuery<ApartmentModel>({
    queryKey: ["apartment", id],
    queryFn: () => getApartmentById(id),
  });
};

export const useGetApartmentPhotosQuery = (apartmentId: number) => {
  return useQuery<ApartmentPhotoModel[]>({
    queryKey: ["apartmentPhotos", apartmentId],
    queryFn: () => getApartmentPhotos(apartmentId),
    staleTime: 300000,
  });
};

export const useGetApartmentPhotoQuery = (
  apartmentId: number,
  photoId: number
) => {
  return useQuery<ApartmentPhotoModel>({
    queryKey: ["apartmentPhoto", apartmentId, photoId],
    queryFn: () => getApartmentPhoto(apartmentId, photoId),
  });
};
