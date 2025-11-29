import { useMutation } from "@tanstack/react-query";
import { login, signUp, logout } from "../apis/auth";
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function saveTokens(
  accessToken: string | undefined,
  refreshToken: string | undefined
) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function useLoginMutation(
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: unknown) => void
) {
  return useMutation<LoginResponse, unknown, LoginRequest>({
    mutationKey: ["auth", "signin"],
    mutationFn: login,
    onSuccess: (data) => {
      console.log("[LOGIN SUCCESS]", data);

      const accessToken = (data as any).data?.accessToken;
      const refreshToken = (data as any).data?.refreshToken;

      saveTokens(accessToken, refreshToken);

      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("[LOGIN ERROR]", error);
      onError?.(error);
    },
  });
}

export function useSignUpMutation(
  onSuccess?: (data: SignUpResponse) => void,
  onError?: (error: unknown) => void
) {
  return useMutation<SignUpResponse, unknown, SignUpRequest>({
    mutationKey: ["auth", "signup"],
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("[SIGNUP SUCCESS]", data);
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("[SIGNUP ERROR]", error);
      onError?.(error);
    },
  });
}

export { logout };
