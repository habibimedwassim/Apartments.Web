import { MessageResponseModel } from "@/app/models/api.models";
import api from "./base.api";
import {
  LoginModel,
  LoginResponseModel,
  // RegisterModel,
  VerifyEmailModel,
  EmailModel,
  ResetPasswordModel,
} from "@/app/models/auth.models";

export const login = async (data: LoginModel): Promise<LoginResponseModel> => {
  const response = await api.post<LoginResponseModel>("/auth/login", data);
  return response.data;
};

// export const registerOwner = async (data: RegisterModel) => {
//   const response = await api.post<MessageResponseModel>(
//     "/auth/register-owner",
//     data
//   );
//   return response.data;
// };

// export const registerAdmin = async (data: RegisterModel) => {
//   const response = await api.post<MessageResponseModel>(
//     "/auth/register-admin",
//     data
//   );
//   return response.data;
// };

export const verifyEmail = async (data: VerifyEmailModel) => {
  const response = await api.post<MessageResponseModel>(
    "/auth/verify-email",
    data
  );
  return response.data;
};

export const resendVerificationCode = async (
  data: EmailModel,
  type: string
) => {
  const requestBody = data;
  const query = { type };
  const response = await api.post<MessageResponseModel>(
    "/auth/resend-code",
    requestBody,
    { params: query }
  );
  return response.data;
};

export const forgotPassword = async (data: EmailModel) => {
  const response = await api.post<MessageResponseModel>(
    "/auth/forgot-password",
    data
  );
  return response.data;
};

export const resetPassword = async (data: ResetPasswordModel) => {
  const response = await api.post<MessageResponseModel>(
    "/auth/reset-password",
    data
  );
  return response.data;
};
