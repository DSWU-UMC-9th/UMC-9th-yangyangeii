import { useQuery } from "@tanstack/react-query";
import { fetchLpDetail, type LpDetail } from "../lib/api";

/** LP 상세 쿼리 */
export function useLpDetail(lpId: string) {
  return useQuery<LpDetail>({
    queryKey: ["lp", lpId],
    queryFn: () => fetchLpDetail(lpId),
  });
}
