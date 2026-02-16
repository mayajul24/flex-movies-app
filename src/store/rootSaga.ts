import { all } from 'redux-saga/effects';
import { moviesSaga } from './movies/moviesSaga';
import { searchSaga } from './search/searchSaga';
import { favoritesSaga } from './favorites/favoritesSaga';

export function* rootSaga() {
  yield all([moviesSaga(), searchSaga(), favoritesSaga()]);
}