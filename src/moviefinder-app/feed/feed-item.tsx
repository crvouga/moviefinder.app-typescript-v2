import type { Media } from "../media/media";

export type FeedItem = {
  t: "media";
  media: Media;
  feedIndex: number;
};
