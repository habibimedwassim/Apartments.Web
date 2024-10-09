import api from "./base.api";
import {
  CreateApartmentModel,
  UpdateApartmentModel,
  ApartmentResponseModel,
  mapApartmentData,
  ApartmentModel,
} from "@/app/models/apartment.models";

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

  // Ensure numbers are converted to strings before appending
  formData.append("size", data.size.toString());
  formData.append("rentAmount", data.rentAmount.toString());

  if (data.availableFrom) formData.append("availableFrom", data.availableFrom);

  // Append files for apartmentPhotos
  data.apartmentPhotos.forEach((photo) => {
    formData.append("apartmentPhotos", photo);
  });

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
