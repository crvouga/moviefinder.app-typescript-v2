// https://developer.themoviedb.org/reference/discover-movie
import type { ILogger } from "src/core/logger";
import type { Paginated } from "src/core/paginated";
import { toPageBased } from "src/core/pagination";
import { type Query } from "src/core/query";
import { Err, isErr, Ok, Result } from "src/core/result";
import { GenreId } from "../genre/genre-id";
import type { Media } from "../media";
import { MediaId } from "../media-id";
import type { IMediaDb } from "./interface";
import * as TmdbApi from "./tmdb-api";
import type { DiscoverMovieResult } from "./tmdb-api/discover/movie";

export type Config = TmdbApi.Config & {
  logger: ILogger;
};

export const MediaDb = (config: Config): IMediaDb => {
  const tmdbApi = TmdbApi.TmdbApi(config);
  return {
    async put(_media) {
      return Err("Not implemented");
    },
    async query(query) {
      const gotConfiguration = await tmdbApi.configuration();

      if (isErr(gotConfiguration)) {
        return gotConfiguration;
      }

      const configuration = gotConfiguration.value;

      if (
        query?.where &&
        query.where[0] === "=" &&
        query.where[1] === "mediaId"
      ) {
        const movieId = query.where[2].toString();
        return findOneById({ tmdbApi, configuration, query, movieId });
      }

      const pageBased = toPageBased({
        pageSize: TmdbApi.PAGE_SIZE,
        query,
      });

      config.logger.debug({ query, pageBased });

      const response = Result.collect(
        await Promise.all(
          range(pageBased.startPage, pageBased.endPage + 1).map((page) =>
            tmdbApi.discover.movie({ page }),
          ),
        ),
      );

      if (isErr(response)) {
        return Err(response.error.join(", "));
      }

      const allTmdbItems = response.value.flatMap(
        (response) => response.results,
      );

      const tmdbItems = allTmdbItems.slice(
        pageBased.index,
        pageBased.index + query.limit,
      );

      const total = response.value.reduce(
        (acc, response) => Math.max(acc, response.total_results),
        0,
      );

      const items = tmdbItems.map((result) =>
        discoverMovieResultToMedia(configuration, result),
      );

      return Ok({
        ...query,
        total,
        items,
      });
    },
  };
};

const discoverMovieResultToMedia = (
  configuration: TmdbApi.Configuration,
  item: DiscoverMovieResult,
): Media => {
  return {
    mediaId: MediaId.init(item.id),
    mediaTitle: item.title,
    mediaType: "movie",
    mediaGenreIds: item.genre_ids.map(GenreId.init),
    mediaPoster: TmdbApi.toPosterImageSet({
      configuration,
      posterPath: item.poster_path,
    }),
    mediaDescription: item.overview,
    mediaBackdrop: TmdbApi.toBackdropImageSet({
      configuration,
      backdropPath: item.backdrop_path,
    }),
    mediaPopularity: item.popularity,
  };
};

const findOneById = async (input: {
  tmdbApi: TmdbApi.TmdbApi;
  configuration: TmdbApi.Configuration;
  query: Query<Media>;
  movieId: string;
}): Promise<Result<string, Paginated<Media>>> => {
  const gotMovie = await input.tmdbApi.movie.details({
    movieId: input.movieId.toString(),
  });

  if (isErr(gotMovie)) {
    return gotMovie;
  }

  const movie = gotMovie.value;
  const media: Media = {
    mediaId: MediaId.init(movie.id),
    mediaTitle: movie.title,
    mediaType: "movie",
    mediaGenreIds: movie.genres.map((genre) => GenreId.init(genre.id)),
    mediaPoster: TmdbApi.toPosterImageSet({
      configuration: input.configuration,
      posterPath: movie.poster_path,
    }),
    mediaDescription: movie.overview ?? "",
    mediaBackdrop: TmdbApi.toBackdropImageSet({
      configuration: input.configuration,
      backdropPath: movie.backdrop_path,
    }),
    mediaPopularity: movie.popularity,
  };

  const items = [media];

  return Ok({
    limit: input.query.limit,
    offset: input.query.offset,
    total: items.length,
    items,
  });
};

const range = (start: number, end: number): number[] => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};
