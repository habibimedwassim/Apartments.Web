import { MessageResponseModel } from "../models/api.models";
import { ChangePasswordModel } from "../models/auth.models";
import api from "./base.api";
import {
  UserResponseModel,
  UserModel,
  mapToUserModel,
  UpdateUserModel,
} from "@/app/models/user.models";

const API_URL = "/users";

export const getMyProfile = async (): Promise<UserModel> => {
  const response = await api.get<UserResponseModel>(`${API_URL}/me`);
  const refinedResponse = await mapToUserModel(response.data);
  return refinedResponse;
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
