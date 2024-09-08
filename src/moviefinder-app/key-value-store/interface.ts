import type { Result } from "src/core/result";

export type IKeyValueStore = {
  get: (key: string) => Promise<Result<string, string | null>>;
  set: (key: string, value: string) => Promise<Result<string, null>>;
  child: (namespace: string[]) => IKeyValueStore;
};

export const toKey = (namespace: string[], key: string) => {
  return [...namespace, key].join(":");
};
