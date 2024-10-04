// apartments.api.ts
import api from "./api";
import {
  CreateApartmentModel,
  UpdateApartmentModel,
  ApartmentResponseModel,
  ApartmentQueryFilter,
  PagedResult,
} from "@/models/apartment.models";

// Get all apartments with query filter
export const getMyApartments = async (
  query: ApartmentQueryFilter
): Promise<PagedResult<ApartmentResponseModel>> => {
  const response = await api.get<PagedResult<ApartmentResponseModel>>(
    "users/me/apartments",
    {
      params: query,
    }
  );
  console.log(query);
  return response.data;
};

// Get a single apartment by ID
export const getApartmentById = async (
  id: number
): Promise<ApartmentResponseModel> => {
  const response = await api.get<ApartmentResponseModel>(`/apartments/${id}`);
  return response.data;
};

// Create a new apartment
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
  data.apartmentPhotos.forEach((photo) =>
    formData.append("apartmentPhotos", photo)
  );

  return await api.post("/apartments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update an existing apartment
export const updateApartment = async (
  id: number,
  data: UpdateApartmentModel
) => {
  return await api.patch(`/apartments/${id}`, data);
};

// Delete an apartment
export const deleteApartment = async (id: number) => {
  return await api.delete(`/apartments/${id}`);
};

// Restore an apartment
export const restoreApartment = async (id: number) => {
  return await api.get(`/apartments/${id}/restore`);
};
