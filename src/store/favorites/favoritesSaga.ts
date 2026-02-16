import { put, select, takeEvery } from 'redux-saga/effects';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { FAVORITES_STORAGE_KEY } from '../../utils/constants';
import { loadFavoritesSuccess, toggleFavoriteSuccess } from './favoritesActions';
import {
  LOAD_FAVORITES,
  TOGGLE_FAVORITE,
  ToggleFavorite,
  FavoritesState,
  StoredFavorites,
} from './favoritesTypes';
import { Movie } from '../../types/movie';
import { RootState } from '../index';

function* loadFavoritesSaga() {
  const stored = loadFromLocalStorage<StoredFavorites>(FAVORITES_STORAGE_KEY);
  if (stored && Array.isArray(stored.movieIds)) {
    yield put(loadFavoritesSuccess(stored));
  }
}

function* toggleFavoriteSaga(action: ToggleFavorite) {
  const { movieId, movie } = action.payload;
  const currentState: FavoritesState = yield select((state: RootState) => state.favorites);

  const isCurrentlyFavorite = currentState.movieIds.includes(movieId);
  let newMovieIds: number[];
  let newMoviesById: Record<number, Movie>;

  if (isCurrentlyFavorite) {
    newMovieIds = currentState.movieIds.filter((id) => id !== movieId);
    newMoviesById = { ...currentState.moviesById };
    delete newMoviesById[movieId];
  } else {
    newMovieIds = [...currentState.movieIds, movieId];
    newMoviesById = { ...currentState.moviesById, [movieId]: movie };
  }

  saveToLocalStorage(FAVORITES_STORAGE_KEY, { movieIds: newMovieIds, moviesById: newMoviesById });
  yield put(toggleFavoriteSuccess({ movieIds: newMovieIds, moviesById: newMoviesById }));
}

export function* favoritesSaga() {
  yield takeEvery(LOAD_FAVORITES, loadFavoritesSaga);
  yield takeEvery(TOGGLE_FAVORITE, toggleFavoriteSaga);
}