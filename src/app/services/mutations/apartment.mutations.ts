import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createApartment,
  updateApartment,
  deleteApartment,
  restoreApartment,
} from "@/app/api/apartment.api";
import { UpdateApartmentModel } from "@/app/models/apartment.models";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";

// Mutation to create a new apartment
export const useCreateApartmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Mutation to update an apartment
export const useUpdateApartment = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateApartmentModel }) =>
      updateApartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      toast({
        variant: "default",
        title: "Apartment updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Update Apartment Error",
        description: error.message,
      });
    },
  });
};

// Mutation to delete or archive an apartment
export const useArchiveApartment = (isRestore: boolean) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteApartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      toast({
        variant: "default",
        title: isRestore
          ? "Apartment restored successfully!"
          : "Apartment deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: isRestore ? "Restore Apartment Error" : "Delete Apartment Error",
        description: error.message,
      });
    },
  });
};

// Mutation to restore an apartment
export const useRestoreApartment = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreApartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      toast({
        variant: "default",
        title: "Apartment restored successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Restore Apartment Error",
        description: error.message,
      });
    },
  });
};
