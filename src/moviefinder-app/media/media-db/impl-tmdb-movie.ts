// https://developer.themoviedb.org/reference/discover-movie
import { Err, isErr, Ok } from "src/core/result";
import { GenreId } from "../genre/genre-id";
import type { Media } from "../media";
import { MediaId } from "../media-id";
import type { IMediaDb } from "./interface";
import * as TmdbApi from "./tmdb-api";

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

      if (query.where[0] === "=" && query.where[1] === "mediaId") {
        const gotMovie = await tmdbApi.movie.details({
          movieId: query.where[2].toString(),
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
            configuration: gotConfiguration.value,
            posterPath: movie.poster_path,
          }),
          mediaDescription: movie.overview ?? "",
          mediaBackdrop: TmdbApi.toBackdropImageSet({
            configuration: gotConfiguration.value,
            backdropPath: movie.backdrop_path,
          }),
        };

        return Ok({
          limit: query.limit,
          offset: query.offset,
          total: 1,
          items: [media],
        });
      }

      const configuration = gotConfiguration.value;

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
            mediaId: MediaId.init(result.id),
            mediaTitle: result.title,
            mediaType: "movie",
            mediaGenreIds: result.genre_ids.map((id) => GenreId.init(id)),
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
