import { combineReducers } from 'redux';
import { moviesReducer } from './movies/moviesReducer';
import { searchReducer } from './search/searchReducer';
import { favoritesReducer } from './favorites/favoritesReducer';
import { navigationReducer } from './navigation/navigationReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer,
  search: searchReducer,
  favorites: favoritesReducer,
  navigation: navigationReducer,
});