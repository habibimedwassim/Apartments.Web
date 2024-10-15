import api from "./base.api";
import {
  CreateApartmentModel,
  UpdateApartmentModel,
  ApartmentResponseModel,
  mapApartmentData,
  ApartmentModel,
  mapSingleApartmentData,
  DismissModel,
} from "@/app/models/apartment.models";
import { MessageResponseModel } from "@/app/models/api.models";

// Get all apartments with query filter
export const getMyApartments = async (): Promise<ApartmentModel[]> => {
  const response = await api.get<ApartmentResponseModel[]>(
    "users/me/apartments"
  );

  console.log("API called");
  const refinedResponse = await mapApartmentData(response.data);

  return refinedResponse;
};

// Get a single apartment by ID
export const getApartmentById = async (id: number): Promise<ApartmentModel> => {
  console.log("get by Id API called");
  const response = await api.get<ApartmentResponseModel>(`/apartments/${id}`);
  const refinedResponse = await mapSingleApartmentData(response.data);
  return refinedResponse;
};

// Create a new apartment
export const createApartment = async (data: CreateApartmentModel) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("city", data.city);
  formData.append("street", data.street);
  formData.append("postalCode", data.postalCode);
  formData.append("description", data.description);

  // Ensure numbers are converted to strings before appending
  formData.append("size", data.size.toString());
  formData.append("rentAmount", data.rentAmount.toString());

  if (data.availableFrom) formData.append("availableFrom", data.availableFrom);

  // Append files for apartmentPhotos
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

// Update an existing apartment
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

// Archive or Restore an apartment
export const archiveRestoreApartment = async (id: number) => {
  const response = await api.delete<MessageResponseModel>(`/apartments/${id}`);
  return response.data;
};

// Permanently delete an apartment
export const deleteApartmentPermanent = async (id: number) => {
  const response = await api.delete<MessageResponseModel>(
    `/apartments/${id}?permanent=true`
  );
  return response.data;
};

// Dismiss tenant from apartment
export const dismissFromApartment = async (id: number, data: DismissModel) => {
  const response = await api.post<MessageResponseModel>(
    `/apartments/${id}/dismiss`,
    data
  );
  return response.data;
};
