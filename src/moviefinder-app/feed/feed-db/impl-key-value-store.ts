import { Err } from "src/core/result";
import type { IFeedDb } from "./interface";
import type { IKeyValueStore } from "src/moviefinder-app/key-value-store";

export type Config = {
  keyValueStore: IKeyValueStore;
};

export const FeedDb = (config: Config): IFeedDb => {
  return {
    async get(feedId) {
      return Err("Not implemented");
    },
    async set(feed) {
      return Err("Not implemented");
    },
  };
};
