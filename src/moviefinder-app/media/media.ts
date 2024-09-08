import type { ImageSet } from "src/core/image-set";
import type { MediaId } from "./media-id";

export type Media = {
  mediaId: MediaId;
  mediaTitle: string;
  mediaType: string;
  mediaGenreIds: string[];
  mediaPoster: ImageSet;
  mediaBackdrop: ImageSet;
};
