import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { GRID_COLUMNS } from '../../utils/constants';
import { fetchPopularRequest, fetchNowPlayingRequest } from '../../store/movies/moviesActions';
import { loadFavorites } from '../../store/favorites/favoritesActions';
import {
  selectCurrentMovieList,
  selectCurrentPagination,
  selectCurrentLoading,
  selectCurrentError,
} from '../../store/movies/moviesSelectors';
import { selectSearchIsActive, selectSearchResults, selectSearchLoading, selectSearchError } from '../../store/search/searchSelectors';
import { Layout } from '../../components/Layout/Layout';
import { MovieGrid } from '../../components/MovieGrid/MovieGrid';
import { Pagination } from '../../components/Pagination/Pagination';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeCategory = useSelector((s: RootState) => s.movies.activeCategory);
  const categoryMovies = useSelector(selectCurrentMovieList);
  const pagination = useSelector(selectCurrentPagination);
  const categoryLoading = useSelector(selectCurrentLoading);
  const categoryError = useSelector(selectCurrentError);

  const searchIsActive = useSelector(selectSearchIsActive);
  const searchResults = useSelector(selectSearchResults);
  const searchLoading = useSelector(selectSearchLoading);
  const searchError = useSelector(selectSearchError);

  const activeZone = useSelector((s: RootState) => s.navigation.activeZone);
  const gridPosition = useSelector((s: RootState) => s.navigation.gridPosition);
  const paginationFocusTarget = useSelector((s: RootState) => s.navigation.paginationFocusTarget);

  useEffect(() => {
    dispatch(fetchPopularRequest(1));
    dispatch(loadFavorites());
  }, [dispatch]);

  const displayedMovies = searchIsActive ? searchResults : categoryMovies;
  const loading = searchIsActive ? searchLoading : categoryLoading;
  const error = searchIsActive ? searchError : categoryError;
  const focusedIndex = gridPosition.row * GRID_COLUMNS + gridPosition.col;

  const handleMovieSelect = useCallback(
    (movieId: number) => {
      navigate(`/movie/${movieId}`);
    },
    [navigate],
  );

  const handlePrevPage = useCallback(() => {
    if (pagination.page > 1) {
      if (activeCategory === 'popular') {
        dispatch(fetchPopularRequest(pagination.page - 1));
      } else if (activeCategory === 'now_playing') {
        dispatch(fetchNowPlayingRequest(pagination.page - 1));
      }
    }
  }, [dispatch, activeCategory, pagination.page]);

  const handleNextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      if (activeCategory === 'popular') {
        dispatch(fetchPopularRequest(pagination.page + 1));
      } else if (activeCategory === 'now_playing') {
        dispatch(fetchNowPlayingRequest(pagination.page + 1));
      }
    }
  }, [dispatch, activeCategory, pagination.page, pagination.totalPages]);

  return (
    <Layout>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <MovieGrid
            movies={displayedMovies}
            focusedIndex={focusedIndex}
            isGridActive={activeZone === 'grid'}
            onMovieSelect={handleMovieSelect}
          />
          {activeCategory !== 'favorites' && !searchIsActive && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              isFocused={activeZone === 'pagination'}
              focusTarget={paginationFocusTarget}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
            />
          )}
        </>
      )}
    </Layout>
  );
};