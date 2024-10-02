import axios from "axios";

const api = axios.create({
  // todo move this to .env
  baseURL: "https://localhost:7057/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
