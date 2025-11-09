import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useLpDetail } from "../hooks/useLpDetail";

const Wrap = styled.main`
  max-width: 1000px;
  margin: 16px auto;
  padding: 0 16px;
  display: grid;
  gap: 16px;
`;
const Head = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ddd;
`;
const Disc = styled.img`
  width: 360px;
  max-width: 100%;
  border-radius: 12px;
  border: 1px solid #27272b;
`;
const Section = styled.section`
  background: #17171a;
  border: 1px solid #27272b;
  border-radius: 12px;
  padding: 16px;
  color: #ddd;
`;

export default function LpDetailPage() {
  const { id = "" } = useParams();
  const { data, isLoading, isError, refetch } = useLpDetail(id);

  if (isLoading) {
    return (
      <Wrap>
        <Section>상세를 불러오는 중…</Section>
      </Wrap>
    );
  }
  if (isError || !data) {
    return (
      <Wrap>
        <Section>
          <p style={{ color: "#f77" }}>상세 로딩 실패</p>
          <button onClick={() => refetch()}>다시 시도</button>
        </Section>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Head>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>{data.title}</h1>
      </Head>

      <Section style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {data.coverImage && <Disc src={data.coverImage} alt={data.title} />}
        <div>
          <p>{data.description}</p>
          <div
            style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            {data.tags?.map((t: string) => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  padding: "6px 10px",
                  border: "1px solid #2a2a2e",
                  borderRadius: 999,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </Wrap>
  );
}
