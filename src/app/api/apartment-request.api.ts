import api from "@/app/api/base.api";
import {
  ApartmentRequestModel,
  UpdateApartmentRequestModel,
  ApartmentRequestQueryFilterModel,
} from "@/app/models/apartment-request.models";
import { UserModel } from "@/app/models/user.models";
import { MessageResponseModel, PagedResult } from "@/app/models/api.models";

export const getApartmentRequestById = async (
  id: number
): Promise<ApartmentRequestModel> => {
  const response = await api.get<ApartmentRequestModel>(`/requests/${id}`);
  return response.data;
};

export const getTenantFromApartmentRequest = async (id: number) => {
  const response = await api.get<UserModel>(`/requests/${id}/user`);
  return response.data;
};

export const approveRejectApartmentRequest = async (
  id: number,
  action: string
): Promise<MessageResponseModel> => {
  const response = await api.post<MessageResponseModel>(
    `/requests/${id}?action=${action}`
  );
  return response.data;
};

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

export const cancelApartmentRequest = async (
  id: number
): Promise<MessageResponseModel> => {
  const response = await api.delete<MessageResponseModel>(`/requests/${id}`);
  return response.data;
};

export const getApartmentRequests = async (
  filters: ApartmentRequestQueryFilterModel
): Promise<PagedResult<ApartmentRequestModel>> => {
  console.log("API called: " + filters.type + " Page: " + filters.pageNumber);
  const response = await api.get<PagedResult<ApartmentRequestModel>>(
    `/users/me/requests`,
    {
      params: filters,
    }
  );
  return response.data;
};

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
