import { Ok, unknownToErr } from "src/core/result";
import { z } from "zod";
import { BASE_URL, toBaseHeaders, type Config } from "../shared";

const MovieDetails = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullish(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullish(),
      backdrop_path: z.string().nullish(),
    })
    .nullish(),
  budget: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  homepage: z.string().nullish(),
  id: z.number(),
  imdb_id: z.string().nullish(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string().nullish(),
  popularity: z.number(),
  poster_path: z.string().nullish(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullish(),
      name: z.string(),
      origin_country: z.string(),
    }),
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    }),
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number().nullish(),
  spoken_languages: z.array(
    z.object({
      iso_639_1: z.string(),
      name: z.string(),
    }),
  ),
  status: z.string(),
  tagline: z.string().nullish(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const getMovieDetails =
  (config: Config) => async (input: { movieId: number | string }) => {
    try {
      const url = new URL(`movie/${input.movieId}`, BASE_URL);
      const fetched = await fetch(url.toString(), {
        headers: toBaseHeaders(config),
      });
      const json = await fetched.json();
      const parsed = MovieDetails.parse(json);
      return Ok(parsed);
    } catch (error) {
      return unknownToErr(error);
    }
  };
