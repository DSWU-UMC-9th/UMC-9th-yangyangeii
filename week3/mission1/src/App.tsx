import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import "./index.css";

// 타입
type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
};

type Category = "popular" | "now_playing" | "top_rated" | "upcoming";

type MovieCardProps = {
  title?: string;
  posterPath?: string | null;
  vote?: number;
  release?: string;
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

function Loader({ label = "불러오는 중…" }: { label?: string }) {
  return (
    <div className="min-h-[40vh] grid place-items-center">
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin"
        />
        <span className="text-sm text-white/80">{label}</span>
      </div>
    </div>
  );
}

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

// 네비게이션
function Navbar() {
  const tabs = [
    { to: "/", label: "인기 영화", end: true },
    { to: "/now", label: "상영 중" },
    { to: "/top", label: "평점 높은" },
    { to: "/upcoming", label: "개봉 예정" },
  ];

  const base =
    "px-3 py-1 rounded-md text-sm transition-colors hover:bg-white/10";
  const active = "bg-white text-neutral-900 hover:bg-white";
  const inactive = "text-white/80";

  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            [base, isActive ? active : inactive].join(" ")
          }
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}

function TopPager() {
  const [sp, setSp] = useSearchParams();
  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const go = (p: number) => setSp({ page: String(Math.max(1, p)) });

  return (
    <div className="mx-auto max-w-6xl px-4 pt-2 pb-4">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 rounded-md border border-white/20 disabled:opacity-40"
        >
          ◀
        </button>
        <span className="text-sm text-white/80">{page} 페이지</span>
        <button
          onClick={() => go(page + 1)}
          className="px-3 py-1 rounded-md border border-white/20"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

// 레이아웃
function Layout() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between"></div>
        <div className="mx-auto max-w-6xl px-4">
          <Navbar />
        </div>
        <TopPager />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

// 목록 페이지
function MoviesPage({ category }: { category: Category }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [sp] = useSearchParams();
  const page = Math.max(1, Number(sp.get("page") ?? 1));

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await TMDB.get(`/movie/${category}`, {
          params: { language: "ko-KR", page },
        });
        if (!aborted) setMovies(res.data.results ?? []);
      } catch (e) {
        if (!aborted) setError(e);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => {
      aborted = true;
    };
  }, [category, page]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-[40vh] grid place-items-center text-red-500">
        데이터를 불러오지 못했습니다.
      </div>
    );

  return (
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
            posterPath={m.poster_path ?? null}
            vote={m.vote_average}
            release={m.release_date ?? m.first_air_date}
          />
        </li>
      ))}
    </ul>
  );
}

// 라우터
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MoviesPage category="popular" />} />
          <Route path="now" element={<MoviesPage category="now_playing" />} />
          <Route path="top" element={<MoviesPage category="top_rated" />} />
          <Route path="upcoming" element={<MoviesPage category="upcoming" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
