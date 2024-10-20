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

export const useDeleteApartmentPhotoMutation = (apartmentId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (photoId: number) => deleteApartmentPhoto(apartmentId, photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apartmentPhotos", apartmentId],
      });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });

  return mutation;
};

export const useUploadApartmentPhotosMutation = (apartmentId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: UploadApartmentPhotosModel) =>
      uploadApartmentPhotos(apartmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apartmentPhotos", apartmentId],
      });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });

  return mutation;
};
