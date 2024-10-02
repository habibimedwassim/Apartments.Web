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
