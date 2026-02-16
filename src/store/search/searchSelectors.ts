import { RootState } from '../index';

export const selectSearchQuery = (state: RootState) => state.search.query;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchLoading = (state: RootState) => state.search.loading;
export const selectSearchError = (state: RootState) => state.search.error;
export const selectSearchIsActive = (state: RootState) => state.search.isActive;