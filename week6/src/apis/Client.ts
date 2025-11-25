import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";

const ACCESS_TOKEN_KEY = "accessToken";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  config.headers = config.headers ?? {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const base = config.baseURL ?? api.defaults.baseURL ?? "";
  const url = config.url ?? "";
  console.log("[REQ]", (config.method ?? "GET").toUpperCase(), base + url);

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      console.warn("[401 Unauthorized]", err.config?.url);
    }
    return Promise.reject(err);
  }
);

export default api;
