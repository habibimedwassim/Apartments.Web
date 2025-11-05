import axios from 'axios';
import { useAuthStore } from '@/hooks/use-store';
import { getErrorMessage } from '@/lib/utils';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? '';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  const endpoint = config.url?.replace(api.defaults.baseURL || '', '');

  if (token && !endpoint?.startsWith('/auth')) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = getErrorMessage(error);
    return Promise.reject(message);
  }
);

export default api;
