import { Err, isErr, Ok } from "src/core/result";
import type { IFeedDb } from "./interface";
import type { IKeyValueStore } from "src/moviefinder-app/key-value-store";
import { Feed } from "../feed";
import type { ILogger } from "src/core/logger";

export type Config = {
  logger: ILogger;
  keyValueStore: IKeyValueStore;
};

export const FeedDb = (config: Config): IFeedDb => {
  return {
    async get(feedId) {
      config.logger.debug("FeedDb.get", { feedId });
      const got = await config.keyValueStore.get(feedId);
      if (isErr(got)) {
        config.logger.error("FeedDb.get", { feedId, error: got.error });
        return got;
      }
      if (!got.value) {
        config.logger.debug("FeedDb.get", { feedId, feed: null });
        return Ok(null);
      }
      const decoded = Feed.decode(got.value);
      if (isErr(decoded)) {
        config.logger.error("FeedDb.get", { feedId, error: decoded.error });
        return decoded;
      }
      config.logger.debug("FeedDb.get", { feedId, feed: decoded.value });
      return Ok(decoded.value);
    },
    async put(feed) {
      config.logger.debug("FeedDb.put", { feed });
      const set = await config.keyValueStore.set(
        feed.feedId,
        Feed.encode(feed),
      );
      if (isErr(set)) {
        config.logger.error("FeedDb.put", { feed, error: set.error });
        return set;
      }
      config.logger.debug("FeedDb.put", { feed });
      return set;
    },
  };
};
