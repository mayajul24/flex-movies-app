import { call, put, takeLatest, race, delay, take } from 'redux-saga/effects';
import { fetchPopularMovies, fetchNowPlayingMovies, fetchMovieDetails } from '../../api/tmdbEndpoints';
import { TMDBMovieListResponse, TMDBMovieDetailResponse } from '../../api/types';
import { mapTMDBMovieToMovie, mapTMDBDetailToMovieDetail } from '../../utils/mappers';
import { ApiError } from '../../api/tmdbClient';
import { CATEGORY_FOCUS_DELAY_MS } from '../../utils/constants';
import { Category } from '../../types/movie';
import {
  fetchPopularSuccess,
  fetchPopularFailure,
  fetchNowPlayingSuccess,
  fetchNowPlayingFailure,
  fetchMovieDetailSuccess,
  fetchMovieDetailFailure,
  setActiveCategory,
  fetchPopularRequest,
  fetchNowPlayingRequest,
} from './moviesActions';
import {
  FetchPopularRequest,
  FetchNowPlayingRequest,
  FetchMovieDetailRequest,
  FETCH_POPULAR_REQUEST,
  FETCH_NOW_PLAYING_REQUEST,
  FETCH_MOVIE_DETAIL_REQUEST,
} from './moviesTypes';
import {
  CATEGORY_FOCUSED,
  CATEGORY_CLICKED,
  CategoryFocused,
  CategoryClicked,
} from '../navigation/navigationTypes';

function* fetchPopularSaga(action: FetchPopularRequest) {
  try {
    const response: TMDBMovieListResponse = yield call(fetchPopularMovies, action.payload.page);
    const movies = response.results.map(mapTMDBMovieToMovie);
    yield put(fetchPopularSuccess({
      items: movies,
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    }));
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Failed to fetch popular movies';
    yield put(fetchPopularFailure(message));
  }
}

function* fetchNowPlayingSaga(action: FetchNowPlayingRequest) {
  try {
    const response: TMDBMovieListResponse = yield call(fetchNowPlayingMovies, action.payload.page);
    const movies = response.results.map(mapTMDBMovieToMovie);
    yield put(fetchNowPlayingSuccess({
      items: movies,
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    }));
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Failed to fetch now playing movies';
    yield put(fetchNowPlayingFailure(message));
  }
}

function* fetchMovieDetailSaga(action: FetchMovieDetailRequest) {
  try {
    const response: TMDBMovieDetailResponse = yield call(fetchMovieDetails, action.payload.movieId);
    const detail = mapTMDBDetailToMovieDetail(response);
    yield put(fetchMovieDetailSuccess(detail));
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Failed to fetch movie details';
    yield put(fetchMovieDetailFailure(message));
  }
}

function* fetchCategoryData(category: Category, page: number) {
  if (category === 'popular') {
    yield put(fetchPopularRequest(page));
  } else if (category === 'now_playing') {
    yield put(fetchNowPlayingRequest(page));
  }
}

function* handleCategoryFocused(action: CategoryFocused) {
  const category = action.payload;

  const { timerDone } = yield race({
    timerDone: delay(CATEGORY_FOCUS_DELAY_MS),
    clicked: take(CATEGORY_CLICKED),
    focusLeft: take(CATEGORY_FOCUSED),
  });

  if (timerDone) {
    yield put(setActiveCategory(category));
    yield call(fetchCategoryData, category, 1);
  }
}

function* handleCategoryClicked(action: CategoryClicked) {
  yield put(setActiveCategory(action.payload));
  yield call(fetchCategoryData, action.payload, 1);
}

export function* moviesSaga() {
  yield takeLatest(FETCH_POPULAR_REQUEST, fetchPopularSaga);
  yield takeLatest(FETCH_NOW_PLAYING_REQUEST, fetchNowPlayingSaga);
  yield takeLatest(FETCH_MOVIE_DETAIL_REQUEST, fetchMovieDetailSaga);
  yield takeLatest(CATEGORY_FOCUSED, handleCategoryFocused);
  yield takeLatest(CATEGORY_CLICKED, handleCategoryClicked);
}