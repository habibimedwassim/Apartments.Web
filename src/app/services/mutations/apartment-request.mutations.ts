import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveRejectApartmentRequest,
  cancelApartmentRequest,
  scheduleMeeting,
  updateApartmentRequest,
} from "@/app/api/apartment-request.api";
import { UpdateApartmentRequestModel } from "@/app/models/apartment-request.models";
import { REQUEST_ACTIONS } from "@/app/constants/request";

// Mutation to approve or reject an apartment request
export const useApproveRejectRequestMutation = (requestType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, action }: { id: number; action: string }) =>
      approveRejectApartmentRequest(id, action),

    onSuccess: (_, prop) => {
      queryClient.invalidateQueries({ queryKey: [`${requestType}-requests`] });
      if (prop.action == REQUEST_ACTIONS.Approve) {
        queryClient.invalidateQueries({ queryKey: ["apartments"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["tenants"] });
      }
    },

    onError: (error: string) => {
      throw error;
    },
  });
};

export const useScheduleMeetingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, meetingDate }: { id: number; meetingDate: string }) =>
      scheduleMeeting(id, meetingDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rent-requests"] });
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

// export const useApproveRejectRequestMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       id,
//       action,
//     }: {
//       id: number;
//       action: string;
//       type: string;
//     }) => approveRejectApartmentRequest(id, action),

//     onSuccess: (_, { type }) => {
//       queryClient.invalidateQueries({ queryKey: [`${type}-requests`] });
//     },

//     onError: (error: string) => {
//       throw error;
//     },
//   });
// };
