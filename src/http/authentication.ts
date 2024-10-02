import api from "./api";

export const login = async (data: { email: string; password: string }) => {
  var response = await api.post("/auth/login", data);
  return response;
};

export const forgotPassword = async (data: { email: string }) =>
  await api.post("/auth/forgot-password", data);

export const resetPassword = async (data: {
  email: string;
  verificationCode: string;
  newPassword: string;
}) => await api.post("/auth/reset-password", data);
