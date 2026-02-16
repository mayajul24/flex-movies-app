import { Movie, MovieDetail, Category, PaginatedResult } from '../../types/movie';

export interface CategoryState {
  items: Movie[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export interface MoviesState {
  activeCategory: Category;
  popular: CategoryState;
  nowPlaying: CategoryState;
  movieDetail: {
    data: MovieDetail | null;
    loading: boolean;
    error: string | null;
  };
}

export const FETCH_POPULAR_REQUEST = 'movies/FETCH_POPULAR_REQUEST' as const;
export const FETCH_POPULAR_SUCCESS = 'movies/FETCH_POPULAR_SUCCESS' as const;
export const FETCH_POPULAR_FAILURE = 'movies/FETCH_POPULAR_FAILURE' as const;

export const FETCH_NOW_PLAYING_REQUEST = 'movies/FETCH_NOW_PLAYING_REQUEST' as const;
export const FETCH_NOW_PLAYING_SUCCESS = 'movies/FETCH_NOW_PLAYING_SUCCESS' as const;
export const FETCH_NOW_PLAYING_FAILURE = 'movies/FETCH_NOW_PLAYING_FAILURE' as const;

export const SET_ACTIVE_CATEGORY = 'movies/SET_ACTIVE_CATEGORY' as const;

export const FETCH_MOVIE_DETAIL_REQUEST = 'movies/FETCH_MOVIE_DETAIL_REQUEST' as const;
export const FETCH_MOVIE_DETAIL_SUCCESS = 'movies/FETCH_MOVIE_DETAIL_SUCCESS' as const;
export const FETCH_MOVIE_DETAIL_FAILURE = 'movies/FETCH_MOVIE_DETAIL_FAILURE' as const;
export const CLEAR_MOVIE_DETAIL = 'movies/CLEAR_MOVIE_DETAIL' as const;

export interface FetchPopularRequest {
  type: typeof FETCH_POPULAR_REQUEST;
  payload: { page: number };
}
export interface FetchPopularSuccess {
  type: typeof FETCH_POPULAR_SUCCESS;
  payload: PaginatedResult<Movie>;
}
export interface FetchPopularFailure {
  type: typeof FETCH_POPULAR_FAILURE;
  payload: string;
}

export interface FetchNowPlayingRequest {
  type: typeof FETCH_NOW_PLAYING_REQUEST;
  payload: { page: number };
}
export interface FetchNowPlayingSuccess {
  type: typeof FETCH_NOW_PLAYING_SUCCESS;
  payload: PaginatedResult<Movie>;
}
export interface FetchNowPlayingFailure {
  type: typeof FETCH_NOW_PLAYING_FAILURE;
  payload: string;
}

export interface SetActiveCategory {
  type: typeof SET_ACTIVE_CATEGORY;
  payload: Category;
}

export interface FetchMovieDetailRequest {
  type: typeof FETCH_MOVIE_DETAIL_REQUEST;
  payload: { movieId: number };
}
export interface FetchMovieDetailSuccess {
  type: typeof FETCH_MOVIE_DETAIL_SUCCESS;
  payload: MovieDetail;
}
export interface FetchMovieDetailFailure {
  type: typeof FETCH_MOVIE_DETAIL_FAILURE;
  payload: string;
}
export interface ClearMovieDetail {
  type: typeof CLEAR_MOVIE_DETAIL;
}

export type MoviesAction =
  | FetchPopularRequest
  | FetchPopularSuccess
  | FetchPopularFailure
  | FetchNowPlayingRequest
  | FetchNowPlayingSuccess
  | FetchNowPlayingFailure
  | SetActiveCategory
  | FetchMovieDetailRequest
  | FetchMovieDetailSuccess
  | FetchMovieDetailFailure
  | ClearMovieDetail;