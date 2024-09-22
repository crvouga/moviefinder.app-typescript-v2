import { Ok } from "src/core/result";
import { toKey, type IKeyValueStore } from "./interface";

export type Config = {};

export const KeyValueStore = (config: Config): IKeyValueStore => {
  const keyValue = new Map<string, string>();
  return {
    async get(key) {
      return Ok(keyValue.get(key) ?? null);
    },
    async set(key, value) {
      keyValue.set(key, value);
      return Ok(null);
    },

    async zap(key) {
      keyValue.delete(key);
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
