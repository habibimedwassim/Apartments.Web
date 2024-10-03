import api from "./api";
import {
  LoginModel,
  LoginResponseModel,
  RegisterModel,
  VerifyEmailModel,
  EmailModel,
  ResetPasswordModel,
  ChangePasswordModel,
} from "@/models/auth.models";

// Login
export const login = async (data: LoginModel): Promise<LoginResponseModel> => {
  const response = await api.post<LoginResponseModel>("/auth/login", data);
  return response.data as LoginResponseModel;
};

// Register
export const register = async (data: RegisterModel) => {
  return await api.post("/auth/register", data);
};

// Register Owner
export const registerOwner = async (data: RegisterModel) => {
  return await api.post("/auth/register-owner", data);
};

// Register Admin
export const registerAdmin = async (data: RegisterModel) => {
  return await api.post("/auth/register-admin", data);
};

// Verify Email
export const verifyEmail = async (data: VerifyEmailModel) => {
  return await api.post("/auth/verify-email", data);
};

// Resend Verification Code
export const resendVerificationCode = async (data: EmailModel) => {
  return await api.post("/auth/resend-code", data);
};

// Forgot Password
export const forgotPassword = async (data: EmailModel) => {
  return await api.post("/auth/forgot-password", data);
};

// Reset Password
export const resetPassword = async (data: ResetPasswordModel) => {
  return await api.post("/auth/reset-password", data);
};

// Change Password
export const changePassword = async (data: ChangePasswordModel) => {
  return await api.patch("/auth/change-password", data);
};

// Change Email
export const changeEmail = async (data: EmailModel) => {
  return await api.patch("/auth/change-email", data);
};
