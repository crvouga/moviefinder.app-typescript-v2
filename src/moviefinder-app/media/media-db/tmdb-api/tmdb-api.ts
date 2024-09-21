// https://developer.themoviedb.org/reference/intro/getting-started
import { getConfiguration } from "./configuration";
import { getDiscoverMovie } from "./discover/movie";
import { getMovieDetails } from "./movie/details";
import type { Config } from "./shared";

export const TmdbApi = (config: Config) => {
  return {
    discover: {
      movie: getDiscoverMovie(config),
    },
    movie: {
      details: getMovieDetails(config),
    },
    configuration: getConfiguration(config),
  };
};

export type TmdbApi = ReturnType<typeof TmdbApi>;
