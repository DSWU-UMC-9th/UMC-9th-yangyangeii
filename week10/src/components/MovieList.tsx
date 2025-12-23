import { memo, useCallback } from "react";
import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const MovieList = memo(function MovieList({
  movies,
  onSelectMovie,
}: MovieListProps) {
  const handleClick = useCallback(
    (movie: Movie) => {
      onSelectMovie(movie);
    },
    [onSelectMovie]
  );

  if (movies.length === 0) {
    return <p className="info-text">검색 결과가 없습니다.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => handleClick(movie)}
        />
      ))}
    </div>
  );
});
