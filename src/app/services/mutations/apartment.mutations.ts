import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createApartment,
  updateApartment,
  archiveRestoreApartment,
  deleteApartmentPermanent,
  deleteApartmentPhoto,
  uploadApartmentPhotos,
  dismissFromApartment,
} from "@/app/api/apartment.api";
import {
  DismissModel,
  UpdateApartmentModel,
  UploadApartmentPhotosModel,
} from "@/app/models/apartment.models";

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

// Mutation to archive or restore an apartment
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

// Mutation to permanently delete an apartment
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

// Mutation to dismiss a tenant from an apartment
export const useDismissTenantMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: DismissModel }) =>
      dismissFromApartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
  return mutation;
};

// Mutation to delete a photo from an apartment
export const useDeleteApartmentPhotoMutation = (
  apartmentId: number,
  photoId: number
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteApartmentPhoto(apartmentId, photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apartmentPhotos", apartmentId],
      });
    },
    onError: (error: string) => {
      throw error;
    },
  });

  return mutation;
};

// Mutation to upload photos to an apartment
export const useUploadApartmentPhotosMutation = (apartmentId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: UploadApartmentPhotosModel) =>
      uploadApartmentPhotos(apartmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apartmentPhotos", apartmentId],
      });
    },
    onError: (error: string) => {
      throw error;
    },
  });

  return mutation;
};
