import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveRejectApartmentRequest,
  cancelApartmentRequest,
  updateApartmentRequest,
} from "@/app/api/apartment-request.api";
import { UpdateApartmentRequestModel } from "@/app/models/apartment-request.models";

// Mutation to approve or reject an apartment request
export const useApproveRejectRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: number; action: string }) =>
      approveRejectApartmentRequest(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartmentRequests"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};

// Mutation to cancel an apartment request
export const useCancelRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => cancelApartmentRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartmentRequests"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};

// Mutation to update an apartment request
export const useUpdateRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateApartmentRequestModel;
    }) => updateApartmentRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartmentRequests"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};
