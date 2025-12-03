import { useCallback, useMemo, useState } from "react";
import { searchMovies } from "./api/tmdb";
import type { Movie } from "./types/movie";
import { SearchForm } from "./components/SearchForm";
import { MovieList } from "./components/MovieList";
import { MovieModal } from "./components/MovieModal";

export type LanguageCode = "ko-KR" | "en-US" | "ja-JP";

function App() {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageCode>("ko-KR");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleToggleAdult = useCallback((checked: boolean) => {
    setIncludeAdult(checked);
  }, []);

  const handleChangeLanguage = useCallback((value: LanguageCode) => {
    setLanguage(value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!query.trim()) return;

      try {
        setLoading(true);
        setError(null);

        const data = await searchMovies({
          query,
          includeAdult,
          language,
        });

        setMovies(data.results);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [query, includeAdult, language]
  );

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const sortedMovies = useMemo(
    () => [...movies].sort((a, b) => b.vote_average - a.vote_average),
    [movies]
  );

  return (
    <div className="page">
      <section className="search-section">
        <SearchForm
          query={query}
          includeAdult={includeAdult}
          language={language}
          onChangeQuery={handleChangeQuery}
          onToggleAdult={handleToggleAdult}
          onChangeLanguage={handleChangeLanguage}
          onSubmit={handleSubmit}
        />
      </section>

      <section className="results-section">
        {loading && <p className="info-text">검색 중...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && (
          <MovieList movies={sortedMovies} onSelectMovie={handleSelectMovie} />
        )}
      </section>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
