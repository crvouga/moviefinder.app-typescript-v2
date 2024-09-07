import type { Result } from "src/core/result";
import type { Media } from "src/moviefinder-app/media/media";
import type { Paginated } from "src/moviefinder-app/pagination/paginated";
import type { Query } from "src/moviefinder-app/query/query";

export type MediaDb = {
  put: (media: Media) => Promise<Result<string, null>>;
  query: (query: Query<Media>) => Promise<Result<string, Paginated<Media>>>;
};

export const q: Query<Media> = {
  limit: 10,
  offset: 0,
  order: [["mediaTitle", "asc"]],
  where: [
    "and",
    ["=", "mediaType", "movie"],
    ["in", "mediaGenre", ["action", "comedy"]],
  ],
};
