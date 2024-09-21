import type { IDbConnSql } from "src/core/db-conn-sql";
import { isErr, Ok } from "src/core/result";
import { toKey, type IKeyValueStore } from "./interface";
import { z } from "zod";

export type Config = {
  dbConnSql: IDbConnSql;
};

const Row = z.object({
  value: z.string().nullish(),
});

type Row = z.infer<typeof Row>;

export const KeyValueStore = (config: Config): IKeyValueStore => {
  return {
    async get(key) {
      const result = await config.dbConnSql.query(
        (value): value is Row => Row.safeParse(value).success,
        `SELECT value FROM key_value WHERE key = :key`,
        {
          key,
        },
      );
      if (isErr(result)) {
        return result;
      }
      return Ok(result.value.rows[0]?.value ?? null);
    },
    async set(key, value) {
      const result = await config.dbConnSql.query(
        (value): value is string | null =>
          typeof value === "string" || value === null,
        `INSERT INTO key_value (key, value) VALUES (:key, :value) ON CONFLICT (key) DO UPDATE SET value = :value`,
        {
          key,
          value,
        },
      );
      if (isErr(result)) {
        return result;
      }
      return Ok(null);
    },

    async zap(key) {
      const result = await config.dbConnSql.query(
        (value): value is Row => Row.safeParse(value).success,
        `DELETE FROM key_value WHERE key = :key`,
        {
          key,
        },
      );
      if (isErr(result)) {
        return result;
      }
      return Ok(null);
    },

    child(namespace) {
      const keyValueStore = KeyValueStore(config);
      return {
        ...keyValueStore,
        async get(key) {
          const got = await keyValueStore.get(toKey(namespace, key));
          return got;
        },
        async set(key, value) {
          return await keyValueStore.set(toKey(namespace, key), value);
        },
      };
    },
  };
};
