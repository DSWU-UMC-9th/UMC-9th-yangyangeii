import { memo } from "react";
import type { Movie } from "../types/movie";
import { getPosterUrl } from "../api/tmdb";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = memo(function MovieCard({
  movie,
  onClick,
}: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path);

  const shortOverview = movie.overview
    ? movie.overview.length > 60
      ? movie.overview.slice(0, 60) + "..."
      : movie.overview
    : "줄거리 정보가 없습니다.";

  return (
    <article className="movie-card" onClick={onClick}>
      {posterUrl ? (
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
      ) : (
        <div className="movie-poster placeholder">No Image</div>
      )}

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <p className="movie-release">
          {movie.release_date || "개봉일 정보 없음"}
        </p>

        <p className="movie-overview">{shortOverview}</p>
      </div>
    </article>
  );
});
