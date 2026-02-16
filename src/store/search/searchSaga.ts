import { call, put, debounce } from 'redux-saga/effects';
import { searchMovies } from '../../api/tmdbEndpoints';
import { TMDBMovieListResponse } from '../../api/types';
import { mapTMDBMovieToMovie } from '../../utils/mappers';
import { ApiError } from '../../api/tmdbClient';
import { createRateLimiter } from '../../utils/rateLimiter';
import { DEBOUNCE_MS, MIN_SEARCH_CHARS, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from '../../utils/constants';
import {
  searchMoviesRequest,
  searchMoviesSuccess,
  searchMoviesFailure,
  clearSearch,
} from './searchActions';
import { SET_SEARCH_QUERY, SetSearchQuery } from './searchTypes';

const searchRateLimiter = createRateLimiter({
  maxRequests: RATE_LIMIT_MAX_REQUESTS,
  windowMs: RATE_LIMIT_WINDOW_MS,
});

function* handleSearchInput(action: SetSearchQuery) {
  const query = action.payload.trim();

  if (query.length < MIN_SEARCH_CHARS) {
    yield put(clearSearch());
    return;
  }

  if (!searchRateLimiter.canMakeRequest()) {
    yield put(searchMoviesFailure('Too many requests. Please wait a moment.'));
    return;
  }

  searchRateLimiter.recordRequest();

  try {
    yield put(searchMoviesRequest());
    const response: TMDBMovieListResponse = yield call(searchMovies, query, 1);
    const movies = response.results.map(mapTMDBMovieToMovie);
    yield put(searchMoviesSuccess({
      items: movies,
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    }));
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Search failed';
    yield put(searchMoviesFailure(message));
  }
}

export function* searchSaga() {
  yield debounce(DEBOUNCE_MS, SET_SEARCH_QUERY, handleSearchInput);
}