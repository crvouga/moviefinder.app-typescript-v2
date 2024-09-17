import { describe, expect, test } from "bun:test";
import { SessionId } from "src/core/req/session-id";
import { Ok, unwrap } from "src/core/result";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { FeedId } from "../feed-id";
import { SessionFeedMappingDb } from "./impl";

const Fixture = async () => {
  const f = await BaseFixture();
  const sessionFeedMappingDb = SessionFeedMappingDb({
    t: "key-value-store",
    keyValueStore: f.ctx.keyValueStore,
  });
  return {
    ...f,
    sessionFeedMappingDb,
  };
};

describe(import.meta.file, () => {
  test("get and put", async () => {
    const f = await Fixture();
    const feedId = FeedId.generate();
    const sessionId = SessionId.generate();
    const before = unwrap(await f.sessionFeedMappingDb.get(sessionId));
    const putResult = await f.sessionFeedMappingDb.put(sessionId, feedId);
    const after = unwrap(await f.sessionFeedMappingDb.get(sessionId));
    expect(before).toEqual(null);
    expect(putResult).toEqual(Ok(null));
    expect(after).toEqual(feedId);
  });
});
