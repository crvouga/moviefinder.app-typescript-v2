import type { SessionId } from "src/core/req/session-id";
import type { Result } from "src/core/result";
import type { FeedId } from "../feed-id";

export type ISessionFeedMappingDb = {
  get: (sessionId: SessionId) => Promise<Result<string, FeedId | null>>;
  put: (sessionId: SessionId, feedId: FeedId) => Promise<Result<string, null>>;
};
