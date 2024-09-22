import { expect, describe, test } from "bun:test";
import { BaseFixture } from "../fixture";
import { KeyValueStore, type Config } from "./impl";
import { Ok, unwrap } from "src/core/result";

const Fixture = (config: Config) => {
  const keyValueStore = KeyValueStore(config);

  return {
    keyValueStore,
  };
};

const Fixtures = async () => {
  const f = await BaseFixture();
  const configs: Config[] = [
    {
      t: "in-memory",
    },
  ];

  if (f.testEnv === "integration") {
    configs.push({
      t: "sql",
      dbConnSql: f.dbConnSql,
    });
  }

  return configs.map(Fixture);
};

describe(import.meta.file, () => {
  test("set and get", async () => {
    for (const f of await Fixtures()) {
      const key = crypto.randomUUID();
      const value = "value";

      const before = unwrap(await f.keyValueStore.get(key));

      await f.keyValueStore.set(key, value);

      const after = unwrap(await f.keyValueStore.get(key));

      expect(before).toEqual(null);
      expect(after).toEqual(value);
    }
  });

  test("set multiple times", async () => {
    for (const f of await Fixtures()) {
      const key = crypto.randomUUID();
      const value1 = "value";
      const value2 = "value2";

      const before = unwrap(await f.keyValueStore.get(key));

      await f.keyValueStore.set(key, value1);

      const after = unwrap(await f.keyValueStore.get(key));

      await f.keyValueStore.set(key, value2);

      const after2 = unwrap(await f.keyValueStore.get(key));

      expect(before).toEqual(null);
      expect(after).toEqual(value1);
      expect(after2).toEqual(value2);
    }
  });

  test("zap", async () => {
    for (const f of await Fixtures()) {
      const key = crypto.randomUUID();
      const value = "value";

      await f.keyValueStore.set(key, value);

      const before = await f.keyValueStore.get(key);

      await f.keyValueStore.zap(key);

      const after = await f.keyValueStore.get(key);

      expect(before).toEqual(Ok(value));
      expect(after).toEqual(Ok(null));
    }
  });
});
