import { expect, describe, test } from "bun:test";
import { BaseFixture } from "../fixture";
import { KeyValueStore } from "./impl";
import { unwrap } from "src/core/result";

const Fixture = async () => {
  const f = await BaseFixture();

  const keyValueStore = KeyValueStore({
    type: "sql",
    dbConnSql: f.dbConnSql,
  });

  return {
    ...f,
    keyValueStore,
  };
};

describe(import.meta.file, () => {
  test("set and get", async () => {
    const f = await Fixture();

    const key = crypto.randomUUID();
    const value = "value";

    const before = unwrap(await f.keyValueStore.get(key));

    await f.keyValueStore.set(key, value);

    const after = unwrap(await f.keyValueStore.get(key));

    expect(before).toBe(null);
    expect(after).toBe(value);
  });

  test("set multiple times", async () => {
    const f = await Fixture();

    const key = crypto.randomUUID();
    const value1 = "value";
    const value2 = "value2";

    const before = unwrap(await f.keyValueStore.get(key));

    await f.keyValueStore.set(key, value1);

    const after = unwrap(await f.keyValueStore.get(key));

    await f.keyValueStore.set(key, value2);

    const after2 = unwrap(await f.keyValueStore.get(key));

    expect(before).toBe(null);
    expect(after).toBe(value1);
    expect(after2).toBe(value2);
  });
});
