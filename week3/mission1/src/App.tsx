import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  Navigate,
  useSearchParams,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./index.css";

// 타입
type Category = "popular" | "now_playing" | "top_rated" | "upcoming";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
};

type MovieCardProps = {
  title?: string;
  posterPath?: string | null;
  vote?: number;
  release?: string;
};

type Genre = { id: number; name: string };

type MovieDetails = Movie & {
  overview?: string;
  runtime?: number;
  tagline?: string;
  homepage?: string;
  genres?: Genre[];
};

type CastMember = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};

type CrewMember = {
  id: number;
  name: string;
  job?: string;
  department?: string;
  profile_path?: string | null;
};

// 상세 응답
type DetailResponse = MovieDetails & {
  credits?: { cast: CastMember[]; crew: CrewMember[] };
};

// TMDB 클라이언트
const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: import.meta.env.VITE_TMDB_ACCESS_TOKEN
    ? { Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` }
    : {},
  params: import.meta.env.VITE_TMDB_API_KEY
    ? { api_key: import.meta.env.VITE_TMDB_API_KEY }
    : {},
});

const IMG_POSTER = "https://image.tmdb.org/t/p/w342";
const IMG_BACKDROP = "https://image.tmdb.org/t/p/w780";
const IMG_PROFILE = "https://image.tmdb.org/t/p/w185";

const formatRuntime = (min?: number) =>
  !min && min !== 0 ? "-" : `${Math.floor(min / 60)}시간 ${min % 60}분`;
const formatDate = (d?: string) => (d ? d : "개봉일 미정");

// 로더
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

// 카드
function MovieCard({ title, posterPath, vote, release }: MovieCardProps) {
  const src = posterPath ? `${IMG_POSTER}${posterPath}` : undefined;

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

// 상단 페이지네이션
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

// 커스텀 훅: useCustomFetch
function useCustomFetch<T>(
  request: () => Promise<T>,
  deps: any[] = []
): { data: T | null; loading: boolean; error: unknown; refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const run = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await request();
      setData(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await request();
        if (!ignore) setData(result);
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: run };
}

// 레이아웃
function Layout() {
  const location = useLocation();
  const isDetail = location.pathname.startsWith("/movie/");
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between"></div>
        <div className="mx-auto max-w-6xl px-4">
          <Navbar />
        </div>
        {!isDetail && <TopPager />}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

// 목록페이지 (커스텀 훅 적용)
function MoviesPage({ category }: { category: Category }) {
  const [sp] = useSearchParams();
  const page = Math.max(1, Number(sp.get("page") ?? 1));

  const { data, loading, error, refetch } = useCustomFetch<
    Movie[]
  >(async () => {
    const res = await TMDB.get(`/movie/${category}`, {
      params: { language: "ko-KR", page },
    });
    return (res.data.results ?? []) as Movie[];
  }, [category, page]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="min-h-[40vh] grid place-items-center text-red-500">
        데이터를 불러오지 못했습니다.
        <button
          onClick={refetch}
          className="mt-4 px-3 py-1 rounded-md border border-white/20"
        >
          다시 시도
        </button>
      </div>
    );

  const movies = data ?? [];

  return (
    <ul
      className="
        grid gap-4
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
      "
    >
      {movies.map((m) => (
        <li key={m.id}>
          <Link to={`/movie/${m.id}`} className="block">
            <MovieCard
              title={m.title ?? m.name}
              posterPath={m.poster_path ?? null}
              vote={m.vote_average}
              release={m.release_date ?? m.first_air_date}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 상세 페이지 (커스텀 훅 적용)
function MovieDetailPage() {
  const { movieId } = useParams();

  const { data, loading, error, refetch } =
    useCustomFetch<DetailResponse>(async () => {
      const res = await TMDB.get(`/movie/${movieId}`, {
        params: { language: "ko-KR", append_to_response: "credits" },
      });
      return res.data as DetailResponse;
    }, [movieId]);

  if (loading) return <Loader label="상세 정보를 불러오는 중…" />;
  if (error || !data)
    return (
      <div className="min-h-[40vh] grid place-items-center text-red-500">
        상세 정보를 불러오지 못했습니다.
        <button
          onClick={refetch}
          className="mt-4 px-3 py-1 rounded-md border border-white/20"
        >
          다시 시도
        </button>
      </div>
    );

  const detail = data;
  const title = detail.title ?? detail.name ?? "제목 미정";
  const release = detail.release_date ?? detail.first_air_date;
  const poster = detail.poster_path ? `${IMG_POSTER}${detail.poster_path}` : "";
  const backdrop = detail.backdrop_path
    ? `${IMG_BACKDROP}${detail.backdrop_path}`
    : "";

  const cast = detail.credits?.cast ?? [];
  const crew = detail.credits?.crew ?? [];
  const directors = crew.filter((c) => c.job === "Director").slice(0, 3);
  const topCast = cast.slice(0, 12);

  return (
    <article className="space-y-6">
      {backdrop && (
        <div className="w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
          <img
            src={backdrop}
            alt={title}
            className="w-full h-[220px] md:h-[320px] object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-6">
        <div className="rounded-xl overflow-hidden ring-1 ring-white/10 bg-neutral-800/60">
          {poster ? (
            <img
              src={poster}
              alt={title}
              className="w-full object-cover aspect-[2/3]"
            />
          ) : (
            <div className="aspect-[2/3] grid place-items-center text-white/50">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {detail.tagline && (
            <p className="text-white/70 italic">“{detail.tagline}”</p>
          )}

          <div className="flex flex-wrap gap-2 text-sm text-white/70">
            <span>개봉: {formatDate(release)}</span>
            <span>·</span>
            <span>평점: {detail.vote_average?.toFixed?.(1) ?? "-"}</span>
            <span>·</span>
            <span>러닝타임: {formatRuntime(detail.runtime)}</span>
            {detail.genres && detail.genres.length > 0 && (
              <>
                <span>·</span>
                <span>장르: {detail.genres.map((g) => g.name).join(", ")}</span>
              </>
            )}
          </div>

          {detail.overview && (
            <p className="mt-1 leading-relaxed text-white/90">
              {detail.overview}
            </p>
          )}

          <div className="mt-2 flex gap-2">
            <Link
              to="/"
              className="px-3 py-1 rounded-md border border-white/20 text-white"
            >
              ← 목록으로
            </Link>
            {detail.homepage && (
              <a
                href={detail.homepage}
                target="_blank"
                className="px-3 py-1 rounded-md border border-white/20 text-white"
              >
                공식 홈페이지
              </a>
            )}
          </div>
        </div>
      </div>

      <section className="space-y-3">
        {directors.length > 0 && (
          <>
            <h3 className="text-lg font-semibold">감독</h3>
            <ul className="flex flex-wrap gap-3">
              {directors.map((p) => (
                <li key={`dir-${p.id}`} className="flex items-center gap-3">
                  <PersonAvatar name={p.name} profilePath={p.profile_path} />
                  <div className="text-sm">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-white/70">Director</div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <h3 className="text-lg font-semibold">출연</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {topCast.map((c) => (
            <li
              key={`cast-${c.id}`}
              className="rounded-xl ring-1 ring-white/10 p-3 bg-neutral-800/40"
            >
              <div className="flex items-center gap-3">
                <PersonAvatar name={c.name} profilePath={c.profile_path} />
                <div className="min-w-0">
                  <div className="font-medium truncate">{c.name}</div>
                  <div className="text-xs text-white/70 truncate">
                    {c.character || "역할 미상"}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function PersonAvatar({
  name,
  profilePath,
}: {
  name: string;
  profilePath?: string | null;
}) {
  const src = profilePath ? `${IMG_PROFILE}${profilePath}` : "";
  if (!src) {
    return (
      <div className="h-12 w-12 rounded-full bg-neutral-700 grid place-items-center text-white/80 text-sm">
        {name.slice(0, 1)}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
    />
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
          <Route path="movie/:movieId" element={<MovieDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
