import api from "@/app/api/base.api";
import {
  CreateApartmentModel,
  UpdateApartmentModel,
  ApartmentResponseModel,
  mapApartmentData,
  ApartmentModel,
  mapSingleApartmentData,
  DismissModel,
  ApartmentPhotoModel,
  UploadApartmentPhotosModel,
} from "@/app/models/apartment.models";
import { MessageResponseModel } from "@/app/models/api.models";

export const getMyApartments = async (): Promise<ApartmentModel[]> => {
  const response = await api.get<ApartmentResponseModel[]>(
    "users/me/apartments"
  );

  console.log("API called");
  const refinedResponse = await mapApartmentData(response.data);

  return refinedResponse;
};

export const getApartmentById = async (id: number): Promise<ApartmentModel> => {
  console.log("get by Id API called");
  const response = await api.get<ApartmentResponseModel>(`/apartments/${id}`);
  const refinedResponse = await mapSingleApartmentData(response.data);
  return refinedResponse;
};

export const createApartment = async (data: CreateApartmentModel) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("city", data.city);
  formData.append("street", data.street);
  formData.append("postalCode", data.postalCode);
  formData.append("description", data.description);

  formData.append("size", data.size.toString());
  formData.append("rentAmount", data.rentAmount.toString());

  if (data.availableFrom) formData.append("availableFrom", data.availableFrom);

  data.apartmentPhotos.forEach((photo) => {
    formData.append("apartmentPhotos", photo);
  });

  const response = await api.post<MessageResponseModel>(
    "/apartments",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateApartment = async (
  id: number,
  data: UpdateApartmentModel
) => {
  const response = await api.patch<MessageResponseModel>(
    `/apartments/${id}`,
    data
  );
  return response.data;
};

export const archiveRestoreApartment = async (id: number) => {
  const response = await api.delete<MessageResponseModel>(`/apartments/${id}`);
  return response.data;
};

export const deleteApartmentPermanent = async (id: number) => {
  const response = await api.delete<MessageResponseModel>(
    `/apartments/${id}?permanent=true`
  );
  return response.data;
};

export const dismissFromApartment = async (id: number, data: DismissModel) => {
  const response = await api.post<MessageResponseModel>(
    `/apartments/${id}/dismiss`,
    data
  );
  return response.data;
};

export const getApartmentPhotos = async (id: number) => {
  const response = await api.get<ApartmentPhotoModel[]>(
    `/apartments/${id}/photos`
  );
  return response.data;
};

export const getApartmentPhoto = async (
  apartmentId: number,
  photoId: number
) => {
  const response = await api.get<ApartmentPhotoModel>(
    `/apartments/${apartmentId}/photos/${photoId}`
  );
  return response.data;
};

export const deleteApartmentPhoto = async (
  apartmentId: number,
  photoId: number
) => {
  const response = await api.delete<MessageResponseModel>(
    `/apartments/${apartmentId}/photos/${photoId}`
  );
  return response.data;
};

export const uploadApartmentPhotos = async (
  id: number,
  data: UploadApartmentPhotosModel
) => {
  const formData = new FormData();

  data.apartmentPhotos.forEach((photo) => {
    formData.append("apartmentPhotos", photo);
  });

  const response = await api.post<ApartmentPhotoModel[]>(
    `/apartments/${id}/photos`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
