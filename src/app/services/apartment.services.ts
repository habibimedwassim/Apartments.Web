import {
  getMyApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
  restoreApartment,
} from "@/app/api/apartment.api";
import {
  UpdateApartmentModel,
  ApartmentResponseModel,
} from "@/app/models/apartment.models";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getApartmentsService = () => {
  return useQuery({
    queryKey: ["apartments"],
    queryFn: () => getMyApartments(),
    staleTime: 300000,
  });
};

export const createApartmentService = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createApartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      toast({
        variant: "default",
        title: "Apartment created successfully!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Create Apartment Error",
        description: error.message,
      });
    },
  });

  return mutation;
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
