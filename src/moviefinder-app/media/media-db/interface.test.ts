import { expect, describe, test } from "bun:test";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { MediaDb, type Config } from "./impl";
import { unwrap } from "src/core/result";
import { MediaId } from "../media-id";

const Fixture = (config: Config) => {
  const mediaDb = MediaDb(config);

  return {
    mediaDb,
  };
};

const Fixtures = async () => {
  const f = await BaseFixture();
  const configs: Config[] = [
    {
      t: "tmdb-movie",
      tmdbApiReadAccessToken: f.tmdbApiReadAccessToken,
    },
  ];

  return configs.map(Fixture);
};

describe.skip(import.meta.file, () => {
  test("filter by id", async () => {
    for (const f of await Fixtures()) {
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
    }
  });

  test("limit and offset", async () => {
    for (const f of await Fixtures()) {
      const LIMIT = 100;
      const queried = unwrap(
        await f.mediaDb.query({
          limit: LIMIT,
          offset: 0,
        }),
      );

      expect(queried.items.length).toBe(LIMIT);
    }
  });
});
