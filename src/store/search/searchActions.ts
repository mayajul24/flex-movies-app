import { PaginatedResult, Movie } from '../../types/movie';
import {
  SET_SEARCH_QUERY,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
  CLEAR_SEARCH,
} from './searchTypes';

export const setSearchQuery = (query: string) =>
  ({ type: SET_SEARCH_QUERY, payload: query }) as const;

export const searchMoviesRequest = () =>
  ({ type: SEARCH_MOVIES_REQUEST }) as const;

export const searchMoviesSuccess = (data: PaginatedResult<Movie>) =>
  ({ type: SEARCH_MOVIES_SUCCESS, payload: data }) as const;

export const searchMoviesFailure = (error: string) =>
  ({ type: SEARCH_MOVIES_FAILURE, payload: error }) as const;

export const clearSearch = () =>
  ({ type: CLEAR_SEARCH }) as const;