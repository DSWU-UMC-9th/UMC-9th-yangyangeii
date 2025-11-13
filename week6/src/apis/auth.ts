import client from "./Client";
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types/auth";

/* ============================
      로그인 API
============================ */
export async function login(body: LoginRequest): Promise<LoginResponse> {
  // ✔ Swagger: POST /v1/auth/signin
  const { data } = await client.post<LoginResponse>("/v1/auth/signin", body);
  return data;
}
/* ============================
      회원가입 API (중요)
============================ */
export async function signUp(body: SignUpRequest): Promise<SignUpResponse> {
  // ✔ Swagger에 명확하게 POST /v1/auth/signup
  const { data } = await client.post<SignUpResponse>("/v1/auth/signup", body);
  return data;
}

/* ============================
      로그아웃
============================ */
export function logout() {
  // 필요하면 localStorage 토큰 삭제
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
