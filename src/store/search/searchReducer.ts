import {
  SearchState,
  SearchAction,
  SET_SEARCH_QUERY,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
  CLEAR_SEARCH,
} from './searchTypes';

const initialState: SearchState = {
  query: '',
  results: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  isActive: false,
};

export function searchReducer(state = initialState, action: SearchAction): SearchState {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, query: action.payload, isActive: action.payload.length > 0 };
    case SEARCH_MOVIES_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        results: action.payload.items,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case SEARCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
}