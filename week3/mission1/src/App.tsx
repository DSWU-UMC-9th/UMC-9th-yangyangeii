import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
};

const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: import.meta.env.VITE_TMDB_ACCESS_TOKEN
    ? { Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` }
    : {},
  params: import.meta.env.VITE_TMDB_API_KEY
    ? { api_key: import.meta.env.VITE_TMDB_API_KEY }
    : {},
});

const IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchPopular() {
      try {
        setLoading(true);
        const res = await TMDB.get("/movie/popular", {
          params: { language: "ko-KR", page: 1 },
        });
        console.log("TMDB popular 응답:", res.data);
        setMovies(res.data.results ?? []);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center">불러오는 중…</div>
    );

  if (error)
    return (
      <div className="min-h-screen grid place-items-center text-red-600">
        불러오기 실패함
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="sticky top-0 bg-neutral-900/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-2xl font-bold">인기 영화</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <ul
          className="
            grid gap-4
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
          "
        >
          {movies.map((m) => (
            <li key={m.id}>
              <MovieCard
                title={m.title ?? m.name}
                posterPath={m.poster_path}
                vote={m.vote_average}
                release={m.release_date ?? m.first_air_date}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

/** 🎥 MovieCard 컴포넌트 */
type MovieCardProps = {
  title?: string;
  posterPath?: string | null;
  vote?: number;
  release?: string;
};

function MovieCard({ title, posterPath, vote, release }: MovieCardProps) {
  const src = posterPath ? `${IMG_BASE}${posterPath}` : undefined;

  return (
    <article
      className="group relative rounded-xl overflow-hidden bg-neutral-800/60 ring-1 ring-white/10"
      title={title}
    >
      {src ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover aspect-[2/3]
                     transition duration-300 group-hover:scale-[1.03] group-hover:brightness-75"
        />
      ) : (
        <div className="aspect-[2/3] grid place-items-center text-white/50">
          No Image
        </div>
      )}

      <div
        className="
          pointer-events-none absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-t from-black/80 via-black/40 to-transparent
          flex flex-col justify-end
        "
      >
        <div className="p-3">
          <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
          <p className="mt-1 text-xs text-white/70">
            평점 {vote?.toFixed?.(1) ?? "-"} · {release ?? "미정"}
          </p>
        </div>
      </div>
    </article>
  );
}
