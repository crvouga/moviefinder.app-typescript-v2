import { DiscoverMovie } from "./discover/movie";
import type { Config } from "./shared";

export const TmdbApi = (config: Config) => {
  return {
    discover: {
      movie: DiscoverMovie(config),
    },
  };
};
