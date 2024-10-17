import { MessageResponseModel } from "@/app/models/api.models";
import { ChangePasswordModel, EmailModel } from "@/app/models/auth.models";
import api from "@/app/api/base.api";
import {
  UserResponseModel,
  UserModel,
  mapToUserModel,
  UpdateUserModel,
  VerifyNewEmailModel,
  TenantModel,
  mapToTenantsList,
  mapToTenantModel,
} from "@/app/models/user.models";

const API_URL = "/users";

export const getMyProfile = async (): Promise<UserModel> => {
  const response = await api.get<UserResponseModel>(`${API_URL}/me`);
  const refinedResponse = await mapToUserModel(response.data);
  return refinedResponse;
};

export const getMyTenants = async (): Promise<TenantModel[]> => {
  const response = await api.get<UserResponseModel[]>("users/me/tenants");
  return mapToTenantsList(response.data);
};

export const getTenantById = async (id: number): Promise<TenantModel> => {
  const response = await api.get<UserResponseModel>(`users/${id}`);
  return mapToTenantModel(response.data);
};

export const updateMyProfile = async (data: UpdateUserModel) => {
  const response = await api.patch<UserModel>(`${API_URL}/me`, data);
  return response.data;
};

export const updatePassword = async (data: ChangePasswordModel) => {
  const response = await api.post<MessageResponseModel>(
    `${API_URL}/change-password`,
    data
  );
  return response.data;
};

export const updateEmail = async (data: EmailModel) => {
  const response = await api.post<MessageResponseModel>(
    `${API_URL}/change-email`,
    data
  );
  return response.data;
};

export const verifyNewEmail = async (data: VerifyNewEmailModel) => {
  const response = await api.post<MessageResponseModel>(
    `${API_URL}/verify-email`,
    data
  );
  return response.data;
};
