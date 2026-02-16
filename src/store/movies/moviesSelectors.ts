import { RootState } from '../index';
import { Movie } from '../../types/movie';

export const selectActiveCategory = (state: RootState) => state.movies.activeCategory;

export const selectCurrentMovieList = (state: RootState): Movie[] => {
  switch (state.movies.activeCategory) {
    case 'popular':
      return state.movies.popular.items;
    case 'now_playing':
      return state.movies.nowPlaying.items;
    case 'favorites': {
      const { movieIds, moviesById } = state.favorites;
      return movieIds.map((id) => moviesById[id]).filter(Boolean);
    }
    default:
      return [];
  }
};

export const selectCurrentPagination = (state: RootState) => {
  const cat = state.movies.activeCategory;
  if (cat === 'popular') {
    return { page: state.movies.popular.page, totalPages: state.movies.popular.totalPages };
  }
  if (cat === 'now_playing') {
    return { page: state.movies.nowPlaying.page, totalPages: state.movies.nowPlaying.totalPages };
  }
  return { page: 1, totalPages: 1 };
};

export const selectCurrentLoading = (state: RootState): boolean => {
  const cat = state.movies.activeCategory;
  if (cat === 'popular') return state.movies.popular.loading;
  if (cat === 'now_playing') return state.movies.nowPlaying.loading;
  return false;
};

export const selectCurrentError = (state: RootState): string | null => {
  const cat = state.movies.activeCategory;
  if (cat === 'popular') return state.movies.popular.error;
  if (cat === 'now_playing') return state.movies.nowPlaying.error;
  return null;
};

export const selectMovieDetail = (state: RootState) => state.movies.movieDetail;