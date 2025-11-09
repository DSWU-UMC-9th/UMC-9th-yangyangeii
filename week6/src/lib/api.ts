import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5173",
  withCredentials: true,
});

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

export async function fetchLps(sort: LpSort): Promise<LpItem[]> {
  const map = {
    latest: { _sort: "createdAt", _order: "desc" },
    popular: { _sort: "likes", _order: "desc" },
    price_low: { _sort: "price", _order: "asc" },
    price_high: { _sort: "price", _order: "desc" },
  } as const;
  const params = map[sort] ?? map.latest;
  const { data } = await api.get("/v1/lps", { params });
  return data;
}

export async function fetchLpDetail(id: string | number): Promise<LpDetail> {
  const { data } = await api.get(`/v1/lps/${id}`);
  return data;
}
