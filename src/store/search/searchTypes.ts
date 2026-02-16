import { Movie, PaginatedResult } from '../../types/movie';

export interface SearchState {
  query: string;
  results: Movie[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  isActive: boolean;
}

export const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY' as const;
export const SEARCH_MOVIES_REQUEST = 'search/SEARCH_MOVIES_REQUEST' as const;
export const SEARCH_MOVIES_SUCCESS = 'search/SEARCH_MOVIES_SUCCESS' as const;
export const SEARCH_MOVIES_FAILURE = 'search/SEARCH_MOVIES_FAILURE' as const;
export const CLEAR_SEARCH = 'search/CLEAR_SEARCH' as const;

export interface SetSearchQuery {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}
export interface SearchMoviesRequest {
  type: typeof SEARCH_MOVIES_REQUEST;
}
export interface SearchMoviesSuccess {
  type: typeof SEARCH_MOVIES_SUCCESS;
  payload: PaginatedResult<Movie>;
}
export interface SearchMoviesFailure {
  type: typeof SEARCH_MOVIES_FAILURE;
  payload: string;
}
export interface ClearSearch {
  type: typeof CLEAR_SEARCH;
}

export type SearchAction =
  | SetSearchQuery
  | SearchMoviesRequest
  | SearchMoviesSuccess
  | SearchMoviesFailure
  | ClearSearch;