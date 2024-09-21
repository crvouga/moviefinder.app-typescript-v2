// https://developer.themoviedb.org/reference/discover-movie
import type { Paginated } from "src/core/paginated";
import { toIndexWithinPage, toPageBased } from "src/core/pagination";
import type { Query } from "src/core/query";
import { Err, isErr, Ok, Result } from "src/core/result";
import { GenreId } from "../../genre/genre-id";
import type { Media } from "../../media";
import { MediaId } from "../../media-id";
import type { IMediaDb } from "../interface";
import * as TmdbApi from "../tmdb-api";
import type { TmdbDiscoverMovieParams } from "../tmdb-api/discover/movie";

export type Config = TmdbApi.Config;

export const MediaDb = (config: Config): IMediaDb => {
  const tmdbApi = TmdbApi.TmdbApi(config);
  return {
    async put(media) {
      return Err("Not implemented");
    },
    async query(query) {
      const gotConfiguration = await tmdbApi.configuration();

      if (isErr(gotConfiguration)) {
        return gotConfiguration;
      }

      if (
        query?.where &&
        query.where[0] === "=" &&
        query.where[1] === "mediaId"
      ) {
        return findOneById({
          tmdbApi,
          configuration: gotConfiguration.value,
          query,
          movieId: query.where[2].toString(),
        });
      }

      const configuration = gotConfiguration.value;

      const pageBased = toPageBased(TmdbApi.PAGE_SIZE, query);

      const got = await tmdbApi.discover.movie({
        page: pageBased.page,
      });

      if (isErr(got)) {
        return got;
      }

      const gotNextPage = await tmdbApi.discover.movie({
        page: pageBased.page + 1,
      });

      if (isErr(gotNextPage)) {
        return gotNextPage;
      }

      const indexWithinPage = toIndexWithinPage(TmdbApi.PAGE_SIZE, query);
      const result = [...got.value.results, ...gotNextPage.value.results].slice(
        indexWithinPage,
        indexWithinPage + query.limit,
      );

      return Ok({
        limit: query.limit,
        offset: query.offset,
        total: got.value.total_results,
        items: result.map(
          (result): Media => ({
            mediaId: MediaId.init(result.id),
            mediaTitle: result.title,
            mediaType: "movie",
            mediaGenreIds: result.genre_ids.map(GenreId.init),
            mediaPoster: TmdbApi.toPosterImageSet({
              configuration,
              posterPath: result.poster_path,
            }),
            mediaDescription: result.overview,
            mediaBackdrop: TmdbApi.toBackdropImageSet({
              configuration,
              backdropPath: result.backdrop_path,
            }),
          }),
        ),
      });
    },
  };
};

export const toTmdbDiscoverMovieParams = <T>(
  query: Query<T>,
): TmdbDiscoverMovieParams[] => {
  const pageCount = Math.ceil(query.limit / TmdbApi.PAGE_SIZE);

  const params: TmdbDiscoverMovieParams[] = [];

  for (let i = 0; i < pageCount; i++) {
    const pageBased = toPageBased(TmdbApi.PAGE_SIZE, query);
    params.push({
      page: pageBased.page + i,
    });
  }

  return params;
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
  };

  const items = [media];

  return Ok({
    limit: input.query.limit,
    offset: input.query.offset,
    total: items.length,
    items,
  });
};
