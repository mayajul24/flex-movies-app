import { API_TIMEOUT_MS } from '../utils/constants';

const BASE_URL = 'https://api.themoviedb.org/3';

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  params?: Record<string, string | number>;
}

export async function tmdbFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  const url = new URL(`${BASE_URL}${path}`);
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `TMDB API error: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(408, 'Request timed out');
    }
    throw new ApiError(0, 'Network error');
  } finally {
    clearTimeout(timeoutId);
  }
}