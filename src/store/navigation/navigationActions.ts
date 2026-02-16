import { Category } from '../../types/movie';
import {
  ActiveZone,
  DetailsFocusTarget,
  Direction,
  SET_ACTIVE_ZONE,
  MOVE_GRID_FOCUS,
  SET_GRID_POSITION,
  MOVE_CATEGORY_FOCUS,
  SET_DETAILS_PAGE,
  SET_DETAILS_FOCUS,
  CATEGORY_FOCUSED,
  CATEGORY_CLICKED,
  RESET_GRID_POSITION,
  MOVE_PAGINATION_FOCUS,
} from './navigationTypes';

export const setActiveZone = (zone: ActiveZone) =>
  ({ type: SET_ACTIVE_ZONE, payload: zone }) as const;

export const moveGridFocus = (direction: Direction, totalItems: number) =>
  ({ type: MOVE_GRID_FOCUS, payload: { direction, totalItems } }) as const;

export const setGridPosition = (row: number, col: number) =>
  ({ type: SET_GRID_POSITION, payload: { row, col } }) as const;

export const moveCategoryFocus = (direction: 'left' | 'right') =>
  ({ type: MOVE_CATEGORY_FOCUS, payload: { direction } }) as const;

export const setDetailsPage = (isOn: boolean) =>
  ({ type: SET_DETAILS_PAGE, payload: isOn }) as const;

export const setDetailsFocus = (target: DetailsFocusTarget) =>
  ({ type: SET_DETAILS_FOCUS, payload: target }) as const;

export const categoryFocused = (category: Category) =>
  ({ type: CATEGORY_FOCUSED, payload: category }) as const;

export const categoryClicked = (category: Category) =>
  ({ type: CATEGORY_CLICKED, payload: category }) as const;

export const resetGridPosition = () =>
  ({ type: RESET_GRID_POSITION }) as const;

export const movePaginationFocus = (direction: 'left' | 'right') =>
  ({ type: MOVE_PAGINATION_FOCUS, payload: { direction } }) as const;