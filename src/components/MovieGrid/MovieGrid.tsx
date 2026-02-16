import React, { useRef, useEffect } from 'react';
import { Movie } from '../../types/movie';
import { MovieCard } from '../MovieCard/MovieCard';
import { GridContainer } from './MovieGrid.styled';

interface MovieGridProps {
  movies: Movie[];
  focusedIndex: number;
  isGridActive: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, focusedIndex, isGridActive }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isGridActive || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('[data-movie-card]');
    const focusedCard = cards[focusedIndex] as HTMLElement | undefined;
    if (focusedCard) {
      focusedCard.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIndex, isGridActive]);

  if (movies.length === 0) {
    return null;
  }

  return (
    <GridContainer ref={gridRef}>
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFocused={isGridActive && index === focusedIndex}
        />
      ))}
    </GridContainer>
  );
};