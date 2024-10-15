import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createApartment,
  updateApartment,
  archiveRestoreApartment,
  deleteApartmentPermanent,
} from "@/app/api/apartment.api";
import { UpdateApartmentModel } from "@/app/models/apartment.models";

// Mutation to create a new apartment
export const useCreateApartmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};

// Mutation to update an apartment
export const useUpdateApartmentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateApartmentModel }) =>
      updateApartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
  return mutation;
};

export const useArchiveApartmentMutation = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => archiveRestoreApartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
    onError: (error) => {
      throw error;
    },
  });

  return mutation;
};

export const useDeleteApartmentMutation = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteApartmentPermanent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
    onError: (error) => {
      throw error;
    },
  });

  return mutation;
};
