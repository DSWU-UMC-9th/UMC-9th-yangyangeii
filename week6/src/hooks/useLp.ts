import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../apis/Client";
import type { Lp } from "../types/lp";

const LP_BASE_PATH = "/v1/lps";

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
  const res = await api.get<LpListEnvelope>(LP_BASE_PATH);
  return res.data.data.data;
}

export function useLpListQuery() {
  return useQuery<Lp[]>({
    queryKey: ["lpList"],
    queryFn: fetchLpList,
  });
}

type LpDetailEnvelope = {
  status: boolean;
  message: string;
  statusCode: number;
  data: Lp;
};

async function fetchLpDetail(id: number): Promise<Lp> {
  const res = await api.get<LpDetailEnvelope>(`${LP_BASE_PATH}/${id}`);
  return res.data.data;
}

export function useLpDetail(id: number) {
  return useQuery<Lp>({
    queryKey: ["lpDetail", id],
    queryFn: () => fetchLpDetail(id),
  });
}

type CreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published?: boolean;
};

type CreateLpResponse = {
  status: boolean;
  message: string;
  statusCode: number;
  data: Lp;
};

async function createLp(body: CreateLpDto): Promise<Lp> {
  const payload: CreateLpDto = {
    ...body,
    published: body.published ?? true,
  };

  const res = await api.post<CreateLpResponse>(LP_BASE_PATH, payload);
  return res.data.data;
}

export function useCreateLp() {
  return useMutation({
    mutationFn: createLp,
  });
}
