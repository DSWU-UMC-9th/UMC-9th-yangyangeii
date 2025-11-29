import client from "./Client";
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types/auth";

// 로그인
export async function login(body: LoginRequest): Promise<LoginResponse> {
  const { data } = await client.post<LoginResponse>("/v1/auth/signin", body);
  return data;
}

// 회원가입
export async function signUp(body: SignUpRequest): Promise<SignUpResponse> {
  const { data } = await client.post<SignUpResponse>("/v1/auth/signup", body);
  return data;
}

// 로그아웃
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
