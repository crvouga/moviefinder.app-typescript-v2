import { expect, describe, test } from "bun:test";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { MediaDb, type Config } from "./impl";
import { unwrap } from "src/core/result";
import { MediaId } from "../media-id";
import { Logger } from "src/core/logger";

const Fixture = (config: Config) => {
  const mediaDb = MediaDb(config);

  return {
    mediaDb,
  };
};

const Fixtures = async () => {
  const f = await BaseFixture();
  const configs: Config[] = [];

  if (f.testEnv === "integration") {
    configs.push({
      t: "tmdb-movie",
      tmdbApiReadAccessToken: f.tmdbApiReadAccessToken,
      logger: Logger({ t: "noop" }),
    });
  }

  return configs.map(Fixture);
};

describe(import.meta.file, () => {
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
      const LIMIT = 40;
      const queried = unwrap(
        await f.mediaDb.query({ limit: LIMIT, offset: 0 }),
      );

      expect(queried.items.length).toBe(LIMIT);
    }
  });

  test("no duplicates", async () => {
    for (const f of await Fixtures()) {
      const LIMIT = 50;
      const queried = unwrap(
        await f.mediaDb.query({ limit: LIMIT, offset: 0 }),
      );

      const mediaIds = queried.items.map((media) => media.mediaId);
      const mediaIdFrequencies = toFrequencies(mediaIds);
      const duplicateMediaIds = mediaIds.filter(
        (mediaId) => (mediaIdFrequencies.get(mediaId) ?? 0) > 1,
      );
      const uniqueMediaIds = new Set(mediaIds);
      expect(duplicateMediaIds).toEqual([]);
      expect(mediaIds.length).toBe(uniqueMediaIds.size);
    }
  });

  test("no duplicates small limit and offset", async () => {
    for (const f of await Fixtures()) {
      const LIMIT = 4;
      const queried = unwrap(
        await f.mediaDb.query({ limit: LIMIT, offset: 5 }),
      );

      const mediaIds = queried.items.map((media) => media.mediaId);
      const uniqueMediaIds = new Set(mediaIds);

      expect(mediaIds.length).toBe(uniqueMediaIds.size);
    }
  });
});

const toFrequencies = <T>(input: T[]): Map<T, number> => {
  const frequencies = new Map<T, number>();

  for (const item of input) {
    const count = frequencies.get(item) ?? 0;
    frequencies.set(item, count + 1);
  }

  return frequencies;
};
