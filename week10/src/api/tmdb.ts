import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";

export interface SearchMoviesParams {
  query: string;
  includeAdult: boolean;
  language: string;
}

export interface SearchMoviesResponse {
  results: Movie[];
}

export async function searchMovies(
  params: SearchMoviesParams
): Promise<SearchMoviesResponse> {
  const { query, includeAdult, language } = params;

  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("query", query);
  url.searchParams.set("include_adult", includeAdult ? "true" : "false");
  url.searchParams.set("language", language);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("영화 검색에 실패했습니다.");
  }

  const data = (await res.json()) as SearchMoviesResponse;
  return data;
}

export function getPosterUrl(path: string | null): string {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/w500${path}`;
}
