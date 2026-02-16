import { Movie } from '../../types/movie';

export interface FavoritesState {
  movieIds: number[];
  moviesById: Record<number, Movie>;
  loaded: boolean;
}

export interface StoredFavorites {
  movieIds: number[];
  moviesById: Record<number, Movie>;
}

export const LOAD_FAVORITES = 'favorites/LOAD_FAVORITES' as const;
export const LOAD_FAVORITES_SUCCESS = 'favorites/LOAD_FAVORITES_SUCCESS' as const;
export const TOGGLE_FAVORITE = 'favorites/TOGGLE_FAVORITE' as const;
export const TOGGLE_FAVORITE_SUCCESS = 'favorites/TOGGLE_FAVORITE_SUCCESS' as const;

export interface LoadFavorites {
  type: typeof LOAD_FAVORITES;
}
export interface LoadFavoritesSuccess {
  type: typeof LOAD_FAVORITES_SUCCESS;
  payload: StoredFavorites;
}
export interface ToggleFavorite {
  type: typeof TOGGLE_FAVORITE;
  payload: { movieId: number; movie: Movie };
}
export interface ToggleFavoriteSuccess {
  type: typeof TOGGLE_FAVORITE_SUCCESS;
  payload: StoredFavorites;
}

export type FavoritesAction =
  | LoadFavorites
  | LoadFavoritesSuccess
  | ToggleFavorite
  | ToggleFavoriteSuccess;