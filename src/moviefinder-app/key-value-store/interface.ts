import type { Result } from "src/core/result";

export type IKeyValueStore = {
  get: (key: string) => Promise<Result<string, string | null>>;
  set: (key: string, value: string) => Promise<Result<string, null>>;
};
