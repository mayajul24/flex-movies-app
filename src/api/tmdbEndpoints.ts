import { tmdbFetch } from './tmdbClient';
import { TMDBMovieListResponse, TMDBMovieDetailResponse } from './types';

export const fetchPopularMovies = (page: number) =>
  tmdbFetch<TMDBMovieListResponse>('/movie/popular', { params: { page, language: 'en-US' } });

export const fetchNowPlayingMovies = (page: number) =>
  tmdbFetch<TMDBMovieListResponse>('/movie/now_playing', { params: { page, language: 'en-US' } });

export const searchMovies = (query: string, page: number) =>
  tmdbFetch<TMDBMovieListResponse>('/search/movie', { params: { query, page, language: 'en-US' } });

export const fetchMovieDetails = (movieId: number) =>
  tmdbFetch<TMDBMovieDetailResponse>(`/movie/${movieId}`, { params: { language: 'en-US' } });