import { Err, isErr, Ok } from "src/core/result";
import type { IKeyValueStore } from "src/moviefinder-app/key-value-store";
import { Feed } from "../feed";
import type { ISessionFeedMappingDb } from "./interface";
import { FeedId } from "../feed-id";

export type Config = {
  keyValueStore: IKeyValueStore;
};

export const SessionFeedMappingDb = (config: Config): ISessionFeedMappingDb => {
  return {
    async get(sessionId) {
      const got = await config.keyValueStore.get(sessionId);

      if (isErr(got)) {
        return got;
      }

      if (!got.value) {
        return Ok(null);
      }

      const parsed = FeedId.parser.safeParse(got.value);

      if (parsed.success) {
        return Ok(parsed.data);
      }

      return Ok(null);
    },
    async put(sessionId, feedId) {
      return await config.keyValueStore.set(sessionId, feedId);
    },
  };
};
