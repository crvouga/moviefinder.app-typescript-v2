import { describe, expect, test } from "bun:test";
import { Ok } from "src/core/result";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { User } from "../user";
import { UserDb, type Config } from "./impl";

const Fixture = (config: Config) => {
  const userDb = UserDb(config);
  return {
    userDb,
  };
};

const Fixtures = async (): Promise<ReturnType<typeof Fixture>[]> => {
  const f = await BaseFixture();
  const configs: Config[] = [
    {
      t: "in-memory",
      sleep: async () => {},
    },
    {
      t: "key-value-store",
      keyValueStore: f.ctx.keyValueStore,
      logger: f.logger,
    },
  ];

  return configs.map(Fixture);
};

describe(import.meta.file, () => {
  test("get and put", async () => {
    for (const f of await Fixtures()) {
      const user = User.random();
      const before = await f.userDb.get(user.userId);
      const put = await f.userDb.put(user);
      const after = await f.userDb.get(user.userId);

      expect(before).toEqual(Ok(null));
      expect(put).toEqual(Ok(null));
      expect(after).toEqual(Ok(user));
    }
  });

  test("updating", async () => {
    for (const f of await Fixtures()) {
      const user = User.random();
      const updated: User = { ...user, phone: "123" };

      await f.userDb.put(user);

      const before = await f.userDb.get(user.userId);
      const put = await f.userDb.put(updated);
      const after = await f.userDb.get(user.userId);

      expect(before).toEqual(Ok(user));
      expect(put).toEqual(Ok(null));
      expect(after).toEqual(Ok(updated));
    }
  });

  test("find by phone", async () => {
    for (const f of await Fixtures()) {
      const user = User.random();

      await f.userDb.put(user);

      const found = await f.userDb.findByPhone({ phone: user.phone });

      expect(found).toEqual(Ok(user));
    }
  });
});
