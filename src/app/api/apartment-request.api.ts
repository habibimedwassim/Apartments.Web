import api from "@/app/api/base.api";
import {
  ApartmentRequestModel,
  UpdateApartmentRequestModel,
  ApartmentRequestQueryFilterModel,
} from "@/app/models/apartment-request.models";
import { UserModel } from "@/app/models/user.models";
import { MessageResponseModel } from "@/app/models/api.models";

// Get apartment request by ID
export const getApartmentRequestById = async (
  id: number
): Promise<ApartmentRequestModel> => {
  const response = await api.get<ApartmentRequestModel>(`/requests/${id}`);
  return response.data;
};

// Get tenant associated with an apartment request by request ID
export const getTenantFromApartmentRequest = async (id: number) => {
  const response = await api.get<UserModel>(`/requests/${id}/user`);
  return response.data;
};

// Approve or Reject an apartment request
export const approveRejectApartmentRequest = async (
  id: number,
  action: string
): Promise<MessageResponseModel> => {
  const response = await api.post<MessageResponseModel>(
    `/requests/${id}?action=${action}`
  );
  return response.data;
};

// Update an apartment request
export const updateApartmentRequest = async (
  id: number,
  data: UpdateApartmentRequestModel
): Promise<MessageResponseModel> => {
  const response = await api.patch<MessageResponseModel>(
    `/requests/${id}`,
    data
  );
  return response.data;
};

// Cancel an apartment request
export const cancelApartmentRequest = async (
  id: number
): Promise<MessageResponseModel> => {
  const response = await api.delete<MessageResponseModel>(`/requests/${id}`);
  return response.data;
};

// Get all requests for the current user with optional filters
export const getApartmentRequests = async (
  filters: ApartmentRequestQueryFilterModel
): Promise<ApartmentRequestModel[]> => {
  console.log("API called: " + filters.type);
  const response = await api.get<ApartmentRequestModel[]>(
    `/users/me/requests`,
    {
      params: filters,
    }
  );
  return response.data;
};

// schedule meeting for an apartment request
export const scheduleMeeting = async (
  id: number,
  meetingDate: string
): Promise<MessageResponseModel> => {
  const response = await api.post<MessageResponseModel>(
    `/requests/${id}/meeting`,
    { meetingDate }
  );
  return response.data;
};
