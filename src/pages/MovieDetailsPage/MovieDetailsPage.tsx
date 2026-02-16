import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { TMDB_IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_DETAIL_SIZE } from '../../utils/constants';
import { fetchMovieDetailRequest, clearMovieDetail } from '../../store/movies/moviesActions';
import { toggleFavorite } from '../../store/favorites/favoritesActions';
import { selectMovieDetail } from '../../store/movies/moviesSelectors';
import { selectIsFavorite } from '../../store/favorites/favoritesSelectors';
import { setDetailsPage } from '../../store/navigation/navigationActions';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import {
  DetailsContainer,
  Backdrop,
  DetailsContent,
  PosterWrapper,
  Poster,
  Info,
  MovieTitle,
  Tagline,
  Overview,
  MetaRow,
  GenreList,
  GenreTag,
  ActionButton,
  ButtonRow,
} from './MovieDetailsPage.styled';

export const MovieDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const movieDetail = useSelector(selectMovieDetail);
  const detailsFocusTarget = useSelector((s: RootState) => s.navigation.detailsFocusTarget);
  const movieId = id ? Number(id) : 0;
  const isFavorite = useSelector(selectIsFavorite(movieId));

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetailRequest(movieId));
      dispatch(setDetailsPage(true));
    }
    return () => {
      dispatch(clearMovieDetail());
      dispatch(setDetailsPage(false));
    };
  }, [movieId, dispatch]);

  if (movieDetail.loading) {
    return (
      <DetailsContainer>
        <LoadingSpinner />
      </DetailsContainer>
    );
  }

  if (movieDetail.error) {
    return (
      <DetailsContainer>
        <ErrorMessage message={movieDetail.error} />
      </DetailsContainer>
    );
  }

  if (!movieDetail.data) return null;

  const movie = movieDetail.data;
  const backdropUrl = movie.backdropPath
    ? `${TMDB_IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdropPath}`
    : null;
  const posterUrl = movie.posterPath
    ? `${TMDB_IMAGE_BASE_URL}${POSTER_DETAIL_SIZE}${movie.posterPath}`
    : undefined;

  const handleToggleFavorite = () => {
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
  };

  return (
    <DetailsContainer>
      <Backdrop $src={backdropUrl} />
      <DetailsContent>
        <PosterWrapper>
          {posterUrl && <Poster src={posterUrl} alt={movie.title} />}
        </PosterWrapper>
        <Info>
          <MovieTitle>{movie.title}</MovieTitle>
          {movie.tagline && <Tagline>{movie.tagline}</Tagline>}
          <Overview>{movie.overview}</Overview>
          <MetaRow>
            <span>Rating: {movie.voteAverage.toFixed(1)}/10</span>
            {movie.runtime != null && <span>Runtime: {movie.runtime} min</span>}
            {movie.releaseDate && <span>Release: {movie.releaseDate}</span>}
          </MetaRow>
          {movie.genres.length > 0 && (
            <GenreList>
              {movie.genres.map((g) => (
                <GenreTag key={g.id}>{g.name}</GenreTag>
              ))}
            </GenreList>
          )}
          <ButtonRow>
            <ActionButton
              $isFocused={detailsFocusTarget === 'back'}
              onClick={() => navigate('/')}
            >
              Back
            </ActionButton>
            <ActionButton
              $isFocused={detailsFocusTarget === 'favorite'}
              $variant={isFavorite ? 'primary' : 'default'}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </ActionButton>
          </ButtonRow>
        </Info>
      </DetailsContent>
    </DetailsContainer>
  );
};