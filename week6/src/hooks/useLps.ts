import { useQuery } from "@tanstack/react-query";
import { fetchLps, type LpItem, type LpSort } from "../lib/api";

/** LP 목록 쿼리 (정렬 반영) */
export function useLps(sort: LpSort) {
  return useQuery<LpItem[]>({
    queryKey: ["lps", sort],
    queryFn: () => fetchLps(sort),
    placeholderData: (prev) => prev,
  });
}

export type { LpItem, LpSort };
