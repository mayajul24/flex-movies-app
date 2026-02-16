import { RootState } from '../index';

export const selectActiveZone = (state: RootState) => state.navigation.activeZone;
export const selectCategoryIndex = (state: RootState) => state.navigation.categoryIndex;
export const selectGridPosition = (state: RootState) => state.navigation.gridPosition;
export const selectPaginationFocusTarget = (state: RootState) => state.navigation.paginationFocusTarget;
export const selectIsOnDetailsPage = (state: RootState) => state.navigation.isOnDetailsPage;
export const selectDetailsFocusTarget = (state: RootState) => state.navigation.detailsFocusTarget;