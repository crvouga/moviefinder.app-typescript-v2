import { describe, expect, test } from "bun:test";
import { Ok, unwrap } from "src/core/result";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { Feed } from "../feed";
import { FeedDb } from "./impl";

const Fixture = async () => {
  const f = await BaseFixture();
  return {
    ...f,
    feedDb: f.ctx.feedDb,
  };
};

describe(import.meta.file, () => {
  test("get and put", async () => {
    const f = await Fixture();
    const feed = Feed.init();
    const before = unwrap(await f.feedDb.get(feed.feedId));
    const putResult = await f.feedDb.put(feed);
    const after = unwrap(await f.feedDb.get(feed.feedId));
    expect(before).toEqual(null);
    expect(putResult).toEqual(Ok(null));
    expect(after).toEqual(feed);
  });

  test("update existing", async () => {
    const f = await Fixture();
    const feed = Feed.init();
    await f.feedDb.put(feed);
    const before = unwrap(await f.feedDb.get(feed.feedId));
    const feedNew: Feed = { ...feed, activeIndex: feed.activeIndex + 1 };
    await f.feedDb.put(feedNew);
    const after = unwrap(await f.feedDb.get(feed.feedId));

    expect(before).toEqual(feed);
    expect(after).toEqual(feedNew);
  });
});
