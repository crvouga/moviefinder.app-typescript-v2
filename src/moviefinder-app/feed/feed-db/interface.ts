import type { Result } from "src/core/result";
import type { Feed } from "../feed";
import type { FeedId } from "../feed-id";

export type IFeedDb = {
  get: (feedId: FeedId) => Promise<Result<string, Feed>>;
  set: (feed: Feed) => Promise<Result<string, null>>;
};
