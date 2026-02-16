import React from 'react';
import { Movie } from '../../types/movie';
import { TMDB_IMAGE_BASE_URL, POSTER_SIZE } from '../../utils/constants';
import { CardContainer, PosterImage, CardInfo, Title, Rating } from './MovieCard.styled';

interface MovieCardProps {
  movie: Movie;
  isFocused: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie, isFocused }) => {
  const posterUrl = movie.posterPath
    ? `${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.posterPath}`
    : undefined;

  return (
    <CardContainer $isFocused={isFocused}  data-movie-card>
      {posterUrl ? (
        <PosterImage src={posterUrl} alt={movie.title} loading="lazy" />
      ) : (
        <PosterImage as="div" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          No Image
        </PosterImage>
      )}
      <CardInfo>
        <Title>{movie.title}</Title>
        <Rating>{movie.voteAverage.toFixed(1)}</Rating>
      </CardInfo>
    </CardContainer>
  );
});

MovieCard.displayName = 'MovieCard';