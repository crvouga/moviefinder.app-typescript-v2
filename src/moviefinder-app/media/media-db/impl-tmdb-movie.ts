// https://developer.themoviedb.org/reference/discover-movie
import { Err, isErr, Ok } from "src/core/result";
import type { IMediaDb } from "./interface";
import * as TmdbApi from "./tmdb-api";
import type { Media } from "../media";

export type Config = TmdbApi.Config;

export const MediaDb = (config: Config): IMediaDb => {
  const tmdbApi = TmdbApi.TmdbApi(config);
  return {
    async put(media) {
      return Err("Not implemented");
    },
    async query(query) {
      const got = await tmdbApi.discover.movie({
        page: Math.floor(query.offset / query.limit + 1),
      });

      if (isErr(got)) {
        return got;
      }

      return Ok({
        limit: query.limit,
        offset: query.offset,
        total: got.value.total_results,
        items: got.value.results.map(
          (result): Media => ({
            mediaId: result.id.toString(),
            mediaTitle: result.title,
            mediaType: "movie",
            mediaGenreIds: result.genre_ids.map((id) => id.toString()),
          }),
        ),
      });
    },
  };
};
