// src/hooks/useLp.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../apis/Client"; // ⬅ 여기 소문자로 수정!
import type { Lp } from "../types/lp";

// ==============================
// LP 목록 조회 (GET /lp)
// ==============================
type LpListEnvelope = {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    data: Lp[];
    nextCursor: number;
    hasNext: boolean;
  };
};

async function fetchLpList(): Promise<Lp[]> {
  const res = await api.get<LpListEnvelope>("/v1/lps");
  return res.data.data.data;
}

export function useLpListQuery() {
  return useQuery<Lp[]>({
    queryKey: ["lpList"],
    queryFn: fetchLpList,
  });
}

// ==============================
// LP 상세 조회 (GET /lp/:id)
// ==============================
type LpDetailEnvelope = {
  status: boolean;
  message: string;
  statusCode: number;
  data: Lp;
};

async function fetchLpDetail(id: number): Promise<Lp> {
  const res = await api.get<LpDetailEnvelope>(`/v1/lps/${id}`);
  return res.data.data;
}

export function useLpDetail(id: number) {
  return useQuery<Lp>({
    queryKey: ["lpDetail", id],
    queryFn: () => fetchLpDetail(id),
  });
}

// ==============================
// LP 생성 (POST /lp)
// ==============================
type CreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
};

type CreateLpResponse = {
  status: boolean;
  message: string;
  statusCode: number;
  data: Lp;
};

async function createLp(body: CreateLpDto): Promise<Lp> {
  const res = await api.post<CreateLpResponse>("/lp", body);
  return res.data.data;
}

export function useCreateLp() {
  return useMutation({
    mutationFn: createLp,
  });
}
