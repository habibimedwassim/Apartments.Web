import {
  getMyApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
  restoreApartment,
} from "@/app/api/apartment.api";
import {
  CreateApartmentModel,
  UpdateApartmentModel,
  ApartmentResponseModel,
} from "@/app/models/apartment.models";
import { useQuery } from "@tanstack/react-query";

// Fetch all apartments with filtering
export const useApartments = () => {
  return useQuery({
    queryKey: ["apartments"],
    queryFn: () => getMyApartments(),
    staleTime: 300000,
  });
};

// Fetch a single apartment by ID
export const getApartmentByIdService = async (
  id: number
): Promise<ApartmentResponseModel> => {
  try {
    return await getApartmentById(id);
  } catch (error: any) {
    throw new Error(`Failed to fetch apartment: ${error.message}`);
  }
};

// Create a new apartment
export const createApartmentService = async (data: CreateApartmentModel) => {
  try {
    const rr = await createApartment(data);
    console.log(rr);
    return "Apartment created successfully.";
  } catch (error: any) {
    throw new Error(`Failed to create apartment: ${error.message}`);
  }
};

// Update an apartment
export const updateApartmentService = async (
  id: number,
  data: UpdateApartmentModel
) => {
  try {
    await updateApartment(id, data);
    return "Apartment updated successfully.";
  } catch (error: any) {
    throw new Error(`Failed to update apartment: ${error.message}`);
  }
};

// Delete an apartment
export const deleteApartmentService = async (id: number) => {
  try {
    await deleteApartment(id);
    return "Apartment deleted successfully.";
  } catch (error: any) {
    throw new Error(`Failed to delete apartment: ${error.message}`);
  }
};

// Restore an apartment
export const restoreApartmentService = async (id: number) => {
  try {
    await restoreApartment(id);
    return "Apartment restored successfully.";
  } catch (error: any) {
    throw new Error(`Failed to restore apartment: ${error.message}`);
  }
};
