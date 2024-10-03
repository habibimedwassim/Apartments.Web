import axios from "axios";
import { useAuthStore } from "@/store";

const api = axios.create({
  // todo move this to .env
  baseURL: "https://localhost:7057/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up an interceptor to include the token conditionally
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  // List of endpoints that require the token
  const protectedEndpoints = ["/auth/change-password", "/auth/change-email"];

  // Normalize the URL to ensure it matches correctly
  const endpoint = config.url?.replace(api.defaults.baseURL || "", "");

  // Check if the endpoint is in the protected list or doesn't start with "/auth"
  if (
    token &&
    (protectedEndpoints.includes(endpoint!) || !endpoint?.startsWith("/auth"))
  ) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;
