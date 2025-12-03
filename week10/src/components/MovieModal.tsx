import type { Movie } from "../types/movie";
import { getPosterUrl } from "../api/tmdb";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const posterUrl = getPosterUrl(movie.poster_path);
  const imdbSearchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
    movie.title
  )}`;

  const hasDifferentOriginalTitle =
    movie.original_title && movie.original_title !== movie.title;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {posterUrl && (
          <img src={posterUrl} alt={movie.title} className="modal-poster" />
        )}

        <div className="modal-body">
          <h2 className="modal-title">{movie.title}</h2>

          {hasDifferentOriginalTitle && (
            <p className="modal-original-title">
              원제: <span>{movie.original_title}</span>
            </p>
          )}

          <p className="modal-meta">
            {movie.release_date || "개봉일 정보 없음"}
          </p>

          <p className="modal-overview">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>

          <div className="modal-actions">
            <a
              href={imdbSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
            >
              TMDB에서 검색하기
            </a>
            <button className="primary-button" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
