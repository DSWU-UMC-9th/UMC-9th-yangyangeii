import { useQuery } from "@tanstack/react-query";
import { fetchLps, type LpItem } from "../lib/api";

export function useLps() {
  return useQuery<LpItem[]>({
    queryKey: ["lpList"],
    queryFn: () => fetchLps("latest"),
  });
}
