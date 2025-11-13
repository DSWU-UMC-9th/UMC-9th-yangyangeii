export default function LpDetailPage() {
  const { id } = useParams();
  const lpId = Number(id);
  const { data, isLoading, isError } = useLpDetail(lpId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !data) return <div>LP 정보를 불러오는 데 실패했습니다.</div>;

  return (
    <main>
      <section>
        <img
          src={data.coverImage || data.thumbnail}
          alt={data.title}
          style={{ width: 260, height: 260, objectFit: "cover" }}
        />

        <h1>{data.title}</h1>
        <h2>{data.uploader ?? "알 수 없음"}</h2>

        <p>{data.description}</p>

        <div>
          {(data.tags ?? []).map((tag) => (
            <span key={tag} style={{ marginRight: 8 }}>
              #{tag}
            </span>
          ))}
        </div>

        <p>❤️ {data.likes ?? 0}</p>
      </section>
    </main>
  );
}
