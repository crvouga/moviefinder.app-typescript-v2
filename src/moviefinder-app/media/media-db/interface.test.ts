import { expect, describe, test } from "bun:test";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { MediaDb } from "./impl";
import { unwrap } from "src/core/result";
import { MediaId } from "../media-id";

const Fixture = () => {
  const f = BaseFixture();

  const mediaDb = MediaDb({
    type: "tmdb-movie",
    tmdbApiReadAccessToken: f.tmdbApiReadAccessToken,
  });

  return {
    ...f,
    mediaDb,
  };
};

describe(import.meta.file, () => {
  test("filter by id", async () => {
    const f = Fixture();

    const mediaId = MediaId.init("123");

    const queried = unwrap(
      await f.mediaDb.query({
        limit: 1,
        offset: 0,
        order: [],
        where: ["=", "mediaId", mediaId],
      }),
    );

    expect(queried.items.length).toBe(1);
    expect(queried.items[0]?.mediaId).toBe(mediaId);
  });
});
