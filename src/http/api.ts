import axios from "axios";

const api = axios.create({
  // todo move this to .env
  baseURL: "https://localhost:7057",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  var response = await api.post("/api/auth/login", data);
  return response;
};

export const forgotPassword = async (data: { email: string }) =>
  await api.post("/api/auth/forgot-password", data);

export const resetPassword = async (data: {
  email: string;
  verificationCode: string;
  newPassword: string;
}) => await api.post("/api/auth/reset-password", data);
