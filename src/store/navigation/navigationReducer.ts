import { GRID_COLUMNS } from '../../utils/constants';
import {
  NavigationState,
  NavigationAction,
  SET_ACTIVE_ZONE,
  MOVE_GRID_FOCUS,
  SET_GRID_POSITION,
  MOVE_CATEGORY_FOCUS,
  SET_DETAILS_PAGE,
  SET_DETAILS_FOCUS,
  RESET_GRID_POSITION,
  MOVE_PAGINATION_FOCUS,
} from './navigationTypes';

const TOTAL_CATEGORIES = 3;

const initialState: NavigationState = {
  activeZone: 'categories',
  categoryIndex: 0,
  gridPosition: { row: 0, col: 0 },
  paginationFocusTarget: 'next',
  isOnDetailsPage: false,
  detailsFocusTarget: 'back',
};

export function navigationReducer(
  state = initialState,
  action: NavigationAction,
): NavigationState {
  switch (action.type) {
    case SET_ACTIVE_ZONE:
      return { ...state, activeZone: action.payload };

    case MOVE_GRID_FOCUS: {
      const { direction, totalItems } = action.payload;
      const { row, col } = state.gridPosition;
      const maxRow = Math.max(0, Math.ceil(totalItems / GRID_COLUMNS) - 1);

      switch (direction) {
        case 'left':
          return { ...state, gridPosition: { row, col: Math.max(0, col - 1) } };
        case 'right': {
          const newCol = Math.min(GRID_COLUMNS - 1, col + 1);
          const newIndex = row * GRID_COLUMNS + newCol;
          if (newIndex >= totalItems) return state;
          return { ...state, gridPosition: { row, col: newCol } };
        }
        case 'up':
          if (row === 0) {
            return { ...state, activeZone: 'search' };
          }
          return { ...state, gridPosition: { row: row - 1, col } };
        case 'down': {
          if (row >= maxRow) {
            return { ...state, activeZone: 'pagination' };
          }
          const nextRowIndex = (row + 1) * GRID_COLUMNS + col;
          const clampedCol = nextRowIndex >= totalItems
            ? (totalItems - 1) % GRID_COLUMNS
            : col;
          return { ...state, gridPosition: { row: row + 1, col: clampedCol } };
        }
        default:
          return state;
      }
    }

    case SET_GRID_POSITION:
      return { ...state, gridPosition: action.payload };

    case MOVE_CATEGORY_FOCUS: {
      const { direction } = action.payload;
      const newIndex = direction === 'left'
        ? Math.max(0, state.categoryIndex - 1)
        : Math.min(TOTAL_CATEGORIES - 1, state.categoryIndex + 1);
      return { ...state, categoryIndex: newIndex };
    }

    case MOVE_PAGINATION_FOCUS: {
      const target = action.payload.direction === 'left' ? 'prev' : 'next';
      return { ...state, paginationFocusTarget: target };
    }

    case SET_DETAILS_PAGE:
      return {
        ...state,
        isOnDetailsPage: action.payload,
        detailsFocusTarget: 'back',
      };

    case SET_DETAILS_FOCUS:
      return { ...state, detailsFocusTarget: action.payload };

    case RESET_GRID_POSITION:
      return { ...state, gridPosition: { row: 0, col: 0 } };

    default:
      return state;
  }
}