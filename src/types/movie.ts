export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  genreIds: number[];
}

export interface MovieDetail extends Movie {
  runtime: number | null;
  genres: Array<{ id: number; name: string }>;
  tagline: string;
  budget: number;
  revenue: number;
  status: string;
  homepage: string | null;
}

export type Category = 'popular' | 'now_playing' | 'favorites';

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}