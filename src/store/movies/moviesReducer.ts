import {
  MoviesState,
  MoviesAction,
  FETCH_POPULAR_REQUEST,
  FETCH_POPULAR_SUCCESS,
  FETCH_POPULAR_FAILURE,
  FETCH_NOW_PLAYING_REQUEST,
  FETCH_NOW_PLAYING_SUCCESS,
  FETCH_NOW_PLAYING_FAILURE,
  SET_ACTIVE_CATEGORY,
  FETCH_MOVIE_DETAIL_REQUEST,
  FETCH_MOVIE_DETAIL_SUCCESS,
  FETCH_MOVIE_DETAIL_FAILURE,
  CLEAR_MOVIE_DETAIL,
} from './moviesTypes';

const initialState: MoviesState = {
  activeCategory: 'popular',
  popular: {
    items: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  nowPlaying: {
    items: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  movieDetail: {
    data: null,
    loading: false,
    error: null,
  },
};

export function moviesReducer(state = initialState, action: MoviesAction): MoviesState {
  switch (action.type) {
    case FETCH_POPULAR_REQUEST:
      return { ...state, popular: { ...state.popular, loading: true, error: null } };
    case FETCH_POPULAR_SUCCESS:
      return {
        ...state,
        popular: {
          items: action.payload.items,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
          error: null,
        },
      };
    case FETCH_POPULAR_FAILURE:
      return { ...state, popular: { ...state.popular, loading: false, error: action.payload } };

    case FETCH_NOW_PLAYING_REQUEST:
      return { ...state, nowPlaying: { ...state.nowPlaying, loading: true, error: null } };
    case FETCH_NOW_PLAYING_SUCCESS:
      return {
        ...state,
        nowPlaying: {
          items: action.payload.items,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
          error: null,
        },
      };
    case FETCH_NOW_PLAYING_FAILURE:
      return { ...state, nowPlaying: { ...state.nowPlaying, loading: false, error: action.payload } };

    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };

    case FETCH_MOVIE_DETAIL_REQUEST:
      return { ...state, movieDetail: { data: null, loading: true, error: null } };
    case FETCH_MOVIE_DETAIL_SUCCESS:
      return { ...state, movieDetail: { data: action.payload, loading: false, error: null } };
    case FETCH_MOVIE_DETAIL_FAILURE:
      return { ...state, movieDetail: { data: null, loading: false, error: action.payload } };
    case CLEAR_MOVIE_DETAIL:
      return { ...state, movieDetail: { data: null, loading: false, error: null } };

    default:
      return state;
  }
}