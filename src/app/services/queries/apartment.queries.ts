import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
  return useInfiniteQuery({
    queryKey: ["apartments"],
    queryFn: ({ pageParam = 1 }) => getMyApartments(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
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
