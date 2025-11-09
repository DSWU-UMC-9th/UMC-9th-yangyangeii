import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useLps } from "../hooks/useLps";
import type { LpSort, LpItem } from "../lib/api";
import LpCard from "../components/LpCard";
import SkeletonCard from "../components/SkeletonCard";
import Sidebar from "../components/Sidebar";

const Wrap = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 960px) {
    grid-template-columns: 260px 1fr;
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export default function LpListPage() {
  const [sp] = useSearchParams();
  const sort = (sp.get("sort") || "latest") as LpSort;
  const { data, isLoading, isError, refetch } = useLps(sort);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <Grid>
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      );
    }
    if (isError) {
      return (
        <div style={{ padding: 20 }}>
          <p style={{ color: "#f77" }}>목록 로딩 중 오류가 발생했습니다.</p>
          <button onClick={() => refetch()}>다시 시도</button>
        </div>
      );
    }
    return (
      <Grid>
        {data?.map((it: LpItem) => (
          <LpCard key={it.id} item={it} />
        ))}
      </Grid>
    );
  }, [data, isLoading, isError, refetch]);

  return (
    <Wrap>
      <Sidebar />
      {content}
    </Wrap>
  );
}
