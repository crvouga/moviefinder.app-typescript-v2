import { Err, isErr, Ok } from "src/core/result";
import type { IFeedDb } from "./interface";
import type { IKeyValueStore } from "src/moviefinder-app/key-value-store";
import { Feed } from "../feed";

export type Config = {
  keyValueStore: IKeyValueStore;
};

export const FeedDb = (config: Config): IFeedDb => {
  return {
    async get(feedId) {
      const got = await config.keyValueStore.get(feedId);
      if (isErr(got)) {
        return got;
      }
      if (!got.value) {
        return Ok(null);
      }
      return Feed.decode(got.value);
    },
    async put(feed) {
      return await config.keyValueStore.set(feed.feedId, Feed.encode(feed));
    },
  };
};
