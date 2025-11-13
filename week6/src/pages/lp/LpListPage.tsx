import { useLpListQuery } from "../../hooks/useLp";

export default function LpListPage() {
  const { data, isLoading, error } = useLpListQuery();

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>목록 불러오기 오류가 발생했어요.</div>;

  return (
    <div>
      <h1>LP 목록</h1>
      <ul>
        {data?.map((lp) => (
          <li key={lp.id}>
            <img
              src={lp.thumbnail}
              alt={lp.title}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <strong>{lp.title}</strong>
            <p>{lp.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
