import React from "react";
import { useLps } from "../hooks/useLps";
import LpCard from "../components/LpCard";

export default function LpListPage() {
  const { data, isLoading, isError } = useLps();

  if (isLoading) {
    return <div>LP 목록 불러오는 중...</div>;
  }

  if (isError || !data) {
    return <div>LP 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <main>
      <h1>LP 목록</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {data.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </div>
    </main>
  );
}
