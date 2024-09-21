import type { ImageSet } from "src/core/image-set";
import type { GenreId } from "./genre/genre-id";
import type { MediaId } from "./media-id";
import type { MediaType } from "./media-type";

export type Media = {
  mediaId: MediaId;
  mediaTitle: string;
  mediaDescription: string;
  mediaType: MediaType;
  mediaGenreIds: GenreId[];
  mediaPoster: ImageSet;
  mediaBackdrop: ImageSet;
  mediaPopularity: number;
};
