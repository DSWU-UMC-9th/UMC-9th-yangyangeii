export function useLpDetail(lpId: number | undefined) {
  const enabled = typeof lpId === "number" && !Number.isNaN(lpId);

  const query = useQuery<LpDetail>({
    queryKey: ["lpDetail", lpId],
    queryFn: () => fetchLpDetail(lpId as number),
    enabled,
  });

  return query;
}
//
