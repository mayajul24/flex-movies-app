import { Movie } from '../../types/movie';
import {
  LOAD_FAVORITES,
  LOAD_FAVORITES_SUCCESS,
  TOGGLE_FAVORITE,
  TOGGLE_FAVORITE_SUCCESS,
  StoredFavorites,
} from './favoritesTypes';

export const loadFavorites = () =>
  ({ type: LOAD_FAVORITES }) as const;

export const loadFavoritesSuccess = (data: StoredFavorites) =>
  ({ type: LOAD_FAVORITES_SUCCESS, payload: data }) as const;

export const toggleFavorite = (movieId: number, movie: Movie) =>
  ({ type: TOGGLE_FAVORITE, payload: { movieId, movie } }) as const;

export const toggleFavoriteSuccess = (data: StoredFavorites) =>
  ({ type: TOGGLE_FAVORITE_SUCCESS, payload: data }) as const;