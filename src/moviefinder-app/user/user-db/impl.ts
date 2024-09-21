import type { IUserDb } from "./interface";
import * as ImplDb from "./impl-db";
import * as ImplInMemory from "./impl-in-memory";
import * as ImplKeyValueStore from "./impl-key-value-store";

export type Config =
  | {
      t: "db-conn";
    }
  | (ImplInMemory.Config & {
      t: "in-memory";
    })
  | (ImplKeyValueStore.Config & {
      t: "key-value-store";
    });

export const UserDb = (config: Config): IUserDb => {
  switch (config.t) {
    case "db-conn": {
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
