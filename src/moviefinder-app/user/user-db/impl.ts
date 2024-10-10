import type { IUserDb } from "./interface";
import * as ImplDb from "./impl-db";
import * as ImplInMemory from "./impl-in-memory";
import * as ImplKeyValueStore from "./impl-key-value-store";

export type Config =
  | ImplDb.Config
  | ImplInMemory.Config
  | ImplKeyValueStore.Config;

export const UserDb = (config: Config): IUserDb => {
  switch (config.t) {
    case "db": {
      return ImplDb.UserDb();
    }
    case "in-memory": {
      return ImplInMemory.UserDb(config);
    }
    case "key-value-store": {
      return ImplKeyValueStore.UserDb(config);
    }
  }
};
