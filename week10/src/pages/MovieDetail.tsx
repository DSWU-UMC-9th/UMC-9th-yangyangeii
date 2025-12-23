import { useParams } from "react-router-dom";

export function MovieDetail() {
  const { movieId } = useParams();

  return (
    <main style={{ padding: "24px" }}>
      <h1>영화 상세 페이지</h1>
      <p>movieId: {movieId}</p>
    </main>
  );
}
