// src/lib/api.ts
import axios from "axios";

/**
 * 백엔드 공통 응답 형태
 * 예: { success: true, data: [...], message: "ok" }
 * 실제 백엔드 구조랑 다르면 타입만 살짝 바꿔주면 돼.
 */
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

// 개발에서는 baseURL 비워두고, 같은 오리진(5173) + Vite proxy 사용
// 배포할 때는 VITE_API_BASE_URL에 백엔드 주소 넣어주면 됨.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/* ================= LP 타입들 ================= */

export type LpItem = {
  id: number;
  title: string;
  thumbnail: string;
  uploader?: string;
  likes?: number;
  createdAt?: string;
  tags?: string[];
  price?: number;
};

export type LpDetail = LpItem & {
  description?: string;
  coverImage?: string;
};

export type LpSort = "latest" | "popular" | "price_low" | "price_high";

/* ================ LP 목록 ================ */
/**
 * sort: latest | popular | price_low | price_high
 * -> /v1/lps?sort=latest 이런 식으로 보낸다고 가정
 */
export async function fetchLps(sort: LpSort): Promise<LpItem[]> {
  const params = { sort };

  const { data } = await api.get<ApiResponse<LpItem[]>>("/v1/lps", {
    params,
  });

  // data: ApiResponse<LpItem[]> 라고 보고 data.data 반환
  return data.data;
}

/* ================ LP 상세 ================ */

export async function fetchLpDetail(id: string | number): Promise<LpDetail> {
  const { data } = await api.get<ApiResponse<LpDetail>>(`/v1/lps/${id}`);

  return data.data;
}
