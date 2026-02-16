import { RootState } from '../index';

export const selectFavoriteIds = (state: RootState) => state.favorites.movieIds;
export const selectFavoritesLoaded = (state: RootState) => state.favorites.loaded;

export const selectIsFavorite = (movieId: number) => (state: RootState) =>
  state.favorites.movieIds.includes(movieId);