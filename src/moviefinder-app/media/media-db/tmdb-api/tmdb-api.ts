import { getConfiguration } from "./configuration";
import { getDiscoverMovie } from "./discover/movie";
import type { Config } from "./shared";

export const TmdbApi = (config: Config) => {
  return {
    discover: {
      movie: getDiscoverMovie(config),
    },
    configuration: getConfiguration(config),
  };
};
