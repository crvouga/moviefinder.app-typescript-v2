
import type { Paginated } from "../../paginated";
import type { Query } from "../../query";
import type { Result } from "../../../core/result";
import type { Media } from "../media";

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
