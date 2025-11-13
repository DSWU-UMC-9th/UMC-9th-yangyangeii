// src/apis/Client.ts
import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";

// useAuth.ts에서 저장한 키랑 맞추기
const ACCESS_TOKEN_KEY = "accessToken";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  // ✅ 로그인 성공 시 localStorage에 저장된 accessToken 읽기
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  // 헤더 객체가 없을 수도 있으니 방어 코드
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
