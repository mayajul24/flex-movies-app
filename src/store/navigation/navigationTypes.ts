import { Category } from '../../types/movie';

export type ActiveZone = 'categories' | 'search' | 'grid' | 'pagination';
export type DetailsFocusTarget = 'back' | 'favorite';
export type PaginationFocusTarget = 'prev' | 'next';
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface NavigationState {
  activeZone: ActiveZone;
  categoryIndex: number;
  gridPosition: { row: number; col: number };
  paginationFocusTarget: PaginationFocusTarget;
  isOnDetailsPage: boolean;
  detailsFocusTarget: DetailsFocusTarget;
}

export const SET_ACTIVE_ZONE = 'navigation/SET_ACTIVE_ZONE' as const;
export const MOVE_GRID_FOCUS = 'navigation/MOVE_GRID_FOCUS' as const;
export const SET_GRID_POSITION = 'navigation/SET_GRID_POSITION' as const;
export const MOVE_CATEGORY_FOCUS = 'navigation/MOVE_CATEGORY_FOCUS' as const;
export const SET_DETAILS_PAGE = 'navigation/SET_DETAILS_PAGE' as const;
export const SET_DETAILS_FOCUS = 'navigation/SET_DETAILS_FOCUS' as const;
export const CATEGORY_FOCUSED = 'navigation/CATEGORY_FOCUSED' as const;
export const CATEGORY_CLICKED = 'navigation/CATEGORY_CLICKED' as const;
export const RESET_GRID_POSITION = 'navigation/RESET_GRID_POSITION' as const;
export const MOVE_PAGINATION_FOCUS = 'navigation/MOVE_PAGINATION_FOCUS' as const;

export interface SetActiveZone {
  type: typeof SET_ACTIVE_ZONE;
  payload: ActiveZone;
}
export interface MoveGridFocus {
  type: typeof MOVE_GRID_FOCUS;
  payload: { direction: Direction; totalItems: number };
}
export interface SetGridPosition {
  type: typeof SET_GRID_POSITION;
  payload: { row: number; col: number };
}
export interface MoveCategoryFocus {
  type: typeof MOVE_CATEGORY_FOCUS;
  payload: { direction: 'left' | 'right' };
}
export interface SetDetailsPage {
  type: typeof SET_DETAILS_PAGE;
  payload: boolean;
}
export interface SetDetailsFocus {
  type: typeof SET_DETAILS_FOCUS;
  payload: DetailsFocusTarget;
}
export interface CategoryFocused {
  type: typeof CATEGORY_FOCUSED;
  payload: Category;
}
export interface CategoryClicked {
  type: typeof CATEGORY_CLICKED;
  payload: Category;
}
export interface ResetGridPosition {
  type: typeof RESET_GRID_POSITION;
}
export interface MovePaginationFocus {
  type: typeof MOVE_PAGINATION_FOCUS;
  payload: { direction: 'left' | 'right' };
}

export type NavigationAction =
  | SetActiveZone
  | MoveGridFocus
  | SetGridPosition
  | MoveCategoryFocus
  | SetDetailsPage
  | SetDetailsFocus
  | CategoryFocused
  | CategoryClicked
  | ResetGridPosition
  | MovePaginationFocus;