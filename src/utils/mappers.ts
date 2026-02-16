import { TMDBMovie, TMDBMovieDetailResponse } from '../api/types';
import type { Movie, MovieDetail } from '../types/movie';

export function mapTMDBMovieToMovie(raw: TMDBMovie): Movie {
  return {
    id: raw.id,
    title: raw.title ?? 'Untitled',
    posterPath: raw.poster_path ?? null,
    backdropPath: raw.backdrop_path ?? null,
    overview: raw.overview ?? '',
    releaseDate: raw.release_date ?? '',
    voteAverage: typeof raw.vote_average === 'number' ? raw.vote_average : 0,
    voteCount: typeof raw.vote_count === 'number' ? raw.vote_count : 0,
    genreIds: Array.isArray(raw.genre_ids) ? raw.genre_ids : [],
  };
}

export function mapTMDBDetailToMovieDetail(raw: TMDBMovieDetailResponse): MovieDetail {
  return {
    ...mapTMDBMovieToMovie(raw as unknown as TMDBMovie),
    genreIds: Array.isArray(raw.genres) ? raw.genres.map((g) => g.id) : [],
    runtime: typeof raw.runtime === 'number' ? raw.runtime : null,
    genres: Array.isArray(raw.genres) ? raw.genres : [],
    tagline: raw.tagline ?? '',
    budget: typeof raw.budget === 'number' ? raw.budget : 0,
    revenue: typeof raw.revenue === 'number' ? raw.revenue : 0,
    status: raw.status ?? '',
    homepage: raw.homepage ?? null,
  };
}