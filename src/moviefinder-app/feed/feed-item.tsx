import type { Media } from "../media/media";

export type FeedItem = {
  type: "media";
  media: Media;
};
