import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { GRID_COLUMNS } from '../utils/constants';
import { Category } from '../types/movie';
import {
  setActiveZone,
  moveGridFocus,
  moveCategoryFocus,
  categoryClicked,
  setDetailsFocus,
  resetGridPosition,
  movePaginationFocus,
} from '../store/navigation/navigationActions';
import { fetchPopularRequest, fetchNowPlayingRequest } from '../store/movies/moviesActions';
import { toggleFavorite } from '../store/favorites/favoritesActions';
import { clearSearch } from '../store/search/searchActions';
import { selectCurrentMovieList, selectCurrentPagination, selectMovieDetail } from '../store/movies/moviesSelectors';
import { selectSearchIsActive, selectSearchResults } from '../store/search/searchSelectors';
import { useCategoryFocusTimer } from './useCategoryFocusTimer';

const categories: Category[] = ['popular', 'now_playing', 'favorites'];

export function useKeyboardNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useCategoryFocusTimer();

  const activeZone = useSelector((s: RootState) => s.navigation.activeZone);
  const categoryIndex = useSelector((s: RootState) => s.navigation.categoryIndex);
  const gridPosition = useSelector((s: RootState) => s.navigation.gridPosition);
  const isOnDetailsPage = useSelector((s: RootState) => s.navigation.isOnDetailsPage);
  const detailsFocusTarget = useSelector((s: RootState) => s.navigation.detailsFocusTarget);
  const paginationFocusTarget = useSelector((s: RootState) => s.navigation.paginationFocusTarget);
  const activeCategory = useSelector((s: RootState) => s.movies.activeCategory);
  const categoryMovies = useSelector(selectCurrentMovieList);
  const searchIsActive = useSelector(selectSearchIsActive);
  const searchResults = useSelector(selectSearchResults);
  const pagination = useSelector(selectCurrentPagination);
  const movieDetail = useSelector(selectMovieDetail);
  const favoriteIds = useSelector((s: RootState) => s.favorites.movieIds);

  const movies = searchIsActive ? searchResults : categoryMovies;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Disable Tab globally
      if (e.key === 'Tab') {
        e.preventDefault();
        return;
      }

      // Details page navigation
      if (isOnDetailsPage) {
        handleDetailsKeys(e);
        return;
      }

      // When in search zone, allow typing keys
      if (activeZone === 'search') {
        if (isNavigationKey(e.key)) {
          handleSearchNavKeys(e);
        }
        // Let all other keys pass through to the input
        return;
      }

      if (!isNavigationKey(e.key)) return;
      e.preventDefault();

      switch (activeZone) {
        case 'categories':
          handleCategoryKeys(e);
          break;
        case 'grid':
          handleGridKeys(e);
          break;
        case 'pagination':
          handlePaginationKeys(e);
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      activeZone,
      categoryIndex,
      gridPosition,
      isOnDetailsPage,
      detailsFocusTarget,
      paginationFocusTarget,
      movies,
      activeCategory,
      pagination,
      movieDetail,
      favoriteIds,
    ],
  );

  function isNavigationKey(key: string): boolean {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'].includes(key);
  }

  function handleSearchNavKeys(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        dispatch(setActiveZone('categories'));
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (movies.length > 0) {
          dispatch(setActiveZone('grid'));
        }
        break;
      case 'Escape':
        e.preventDefault();
        dispatch(clearSearch());
        dispatch(setActiveZone('categories'));
        break;
    }
  }

  function handleCategoryKeys(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
        dispatch(moveCategoryFocus('left'));
        break;
      case 'ArrowRight':
        dispatch(moveCategoryFocus('right'));
        break;
      case 'ArrowDown':
        dispatch(setActiveZone('search'));
        break;
      case 'Enter':
        dispatch(categoryClicked(categories[categoryIndex]));
        dispatch(resetGridPosition());
        break;
    }
  }

  function handleGridKeys(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight': {
        const directionMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          ArrowLeft: 'left',
          ArrowRight: 'right',
        };
        dispatch(moveGridFocus(directionMap[e.key], movies.length));
        break;
      }
      case 'Enter': {
        const idx = gridPosition.row * GRID_COLUMNS + gridPosition.col;
        if (idx < movies.length) {
          navigate(`/movie/${movies[idx].id}`);
        }
        break;
      }
      case 'Escape':
        dispatch(setActiveZone('categories'));
        break;
    }
  }

  function handlePaginationKeys(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        dispatch(setActiveZone('grid'));
        break;
      case 'ArrowLeft':
        dispatch(movePaginationFocus('left'));
        break;
      case 'ArrowRight':
        dispatch(movePaginationFocus('right'));
        break;
      case 'Enter': {
        if (paginationFocusTarget === 'prev' && pagination.page > 1) {
          const newPage = pagination.page - 1;
          if (activeCategory === 'popular') dispatch(fetchPopularRequest(newPage));
          else if (activeCategory === 'now_playing') dispatch(fetchNowPlayingRequest(newPage));
          dispatch(resetGridPosition());
        } else if (paginationFocusTarget === 'next' && pagination.page < pagination.totalPages) {
          const newPage = pagination.page + 1;
          if (activeCategory === 'popular') dispatch(fetchPopularRequest(newPage));
          else if (activeCategory === 'now_playing') dispatch(fetchNowPlayingRequest(newPage));
          dispatch(resetGridPosition());
        }
        break;
      }
      case 'Escape':
        dispatch(setActiveZone('grid'));
        break;
    }
  }

  function handleDetailsKeys(e: KeyboardEvent) {
    if (!isNavigationKey(e.key)) return;
    e.preventDefault();

    switch (e.key) {
      case 'Escape':
        navigate('/');
        break;
      case 'ArrowLeft':
        dispatch(setDetailsFocus('back'));
        break;
      case 'ArrowRight':
        dispatch(setDetailsFocus('favorite'));
        break;
      case 'Enter':
        if (detailsFocusTarget === 'back') {
          navigate('/');
        } else if (detailsFocusTarget === 'favorite' && movieDetail.data) {
          const movie = movieDetail.data;
          dispatch(
            toggleFavorite(movie.id, {
              id: movie.id,
              title: movie.title,
              posterPath: movie.posterPath,
              backdropPath: movie.backdropPath,
              overview: movie.overview,
              releaseDate: movie.releaseDate,
              voteAverage: movie.voteAverage,
              voteCount: movie.voteCount,
              genreIds: movie.genreIds,
            }),
          );
        }
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}