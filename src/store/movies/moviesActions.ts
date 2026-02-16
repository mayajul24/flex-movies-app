import { Movie, MovieDetail, Category, PaginatedResult } from '../../types/movie';
import {
  FETCH_POPULAR_REQUEST,
  FETCH_POPULAR_SUCCESS,
  FETCH_POPULAR_FAILURE,
  FETCH_NOW_PLAYING_REQUEST,
  FETCH_NOW_PLAYING_SUCCESS,
  FETCH_NOW_PLAYING_FAILURE,
  SET_ACTIVE_CATEGORY,
  FETCH_MOVIE_DETAIL_REQUEST,
  FETCH_MOVIE_DETAIL_SUCCESS,
  FETCH_MOVIE_DETAIL_FAILURE,
  CLEAR_MOVIE_DETAIL,
} from './moviesTypes';

export const fetchPopularRequest = (page: number) =>
  ({ type: FETCH_POPULAR_REQUEST, payload: { page } }) as const;

export const fetchPopularSuccess = (data: PaginatedResult<Movie>) =>
  ({ type: FETCH_POPULAR_SUCCESS, payload: data }) as const;

export const fetchPopularFailure = (error: string) =>
  ({ type: FETCH_POPULAR_FAILURE, payload: error }) as const;

export const fetchNowPlayingRequest = (page: number) =>
  ({ type: FETCH_NOW_PLAYING_REQUEST, payload: { page } }) as const;

export const fetchNowPlayingSuccess = (data: PaginatedResult<Movie>) =>
  ({ type: FETCH_NOW_PLAYING_SUCCESS, payload: data }) as const;

export const fetchNowPlayingFailure = (error: string) =>
  ({ type: FETCH_NOW_PLAYING_FAILURE, payload: error }) as const;

export const setActiveCategory = (category: Category) =>
  ({ type: SET_ACTIVE_CATEGORY, payload: category }) as const;

export const fetchMovieDetailRequest = (movieId: number) =>
  ({ type: FETCH_MOVIE_DETAIL_REQUEST, payload: { movieId } }) as const;

export const fetchMovieDetailSuccess = (detail: MovieDetail) =>
  ({ type: FETCH_MOVIE_DETAIL_SUCCESS, payload: detail }) as const;

export const fetchMovieDetailFailure = (error: string) =>
  ({ type: FETCH_MOVIE_DETAIL_FAILURE, payload: error }) as const;

export const clearMovieDetail = () =>
  ({ type: CLEAR_MOVIE_DETAIL }) as const;