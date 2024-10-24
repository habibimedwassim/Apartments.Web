import { MessageResponseModel, PagedResult } from "@/app/models/api.models";
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

export const getUsers = async (filters: {
  role?: string;
  pageNumber: number;
}): Promise<PagedResult<UserModel>> => {
  const response = await api.get<PagedResult<UserModel>>(`/admin/users`, {
    params: filters,
  });

  return response.data;
};

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
  const formData = new FormData();

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }
  if (data.firstName) {
    formData.append("firstName", data.firstName);
  }
  if (data.lastName) {
    formData.append("lastName", data.lastName);
  }
  if (data.phoneNumber) {
    formData.append("phoneNumber", data.phoneNumber);
  }
  if (data.gender) {
    formData.append("gender", data.gender);
  }
  if (data.dateOfBirth) {
    formData.append("dateOfBirth", data.dateOfBirth);
  }

  const response = await api.patch<UserModel>(`${API_URL}/me`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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

export const changeUserRole = async (
  id: number,
  roleName: string
): Promise<MessageResponseModel> => {
  const response = await api.post<MessageResponseModel>(
    `/admin/users/${id}/assign-role`,
    { roleName }
  );
  return response.data;
};

export const disableUser = async (
  id: number
): Promise<MessageResponseModel> => {
  const response = await api.delete<MessageResponseModel>(`/admin/users/${id}`);
  return response.data;
};
