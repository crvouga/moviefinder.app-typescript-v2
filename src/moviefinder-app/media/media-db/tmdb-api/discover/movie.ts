import { Ok, unknownToErr } from "src/core/result";
import { z } from "zod";
import { BASE_URL, toBaseHeaders, type Config } from "../shared";

const DiscoverMovieResponse = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      adult: z.boolean(),
      backdrop_path: z.string().nullable(),
      genre_ids: z.array(z.number()),
      id: z.number(),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string(),
      popularity: z.number(),
      poster_path: z.string().nullable(),
      release_date: z.string(),
      title: z.string(),
      video: z.boolean(),
      vote_average: z.number(),
      vote_count: z.number(),
    }),
  ),
  total_pages: z.number(),
  total_results: z.number(),
});

export type TmdbDiscoverMovieParams = {
  page: number;
};

export const getDiscoverMovie =
  (config: Config) => async (input: TmdbDiscoverMovieParams) => {
    try {
      const url = new URL("discover/movie", BASE_URL);
      url.searchParams.set("include_adult", "false");
      url.searchParams.set("include_video", "true");
      url.searchParams.set("language", "en-US");
      url.searchParams.set("page", input.page.toString());
      url.searchParams.set("sort_by", "popularity.desc");
      const fetched = await fetch(url.toString(), {
        headers: toBaseHeaders(config),
      });
      const json = await fetched.json();
      const parsed = DiscoverMovieResponse.parse(json);
      return Ok(parsed);
    } catch (error) {
      return unknownToErr(error);
    }
  };
