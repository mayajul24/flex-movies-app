import {
  FavoritesState,
  FavoritesAction,
  LOAD_FAVORITES_SUCCESS,
  TOGGLE_FAVORITE_SUCCESS,
} from './favoritesTypes';

const initialState: FavoritesState = {
  movieIds: [],
  moviesById: {},
  loaded: false,
};

export function favoritesReducer(state = initialState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case LOAD_FAVORITES_SUCCESS:
      return {
        movieIds: action.payload.movieIds,
        moviesById: action.payload.moviesById,
        loaded: true,
      };
    case TOGGLE_FAVORITE_SUCCESS:
      return {
        ...state,
        movieIds: action.payload.movieIds,
        moviesById: action.payload.moviesById,
      };
    default:
      return state;
  }
}