import * as ImplDb from "./impl-db";
import * as ImplInMemory from "./impl-in-memory";
import * as ImplKeyValueStore from "./impl-key-value-store";
import type { IUserSessionDb } from "./interface";

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

export const UserSessionDb = (config: Config): IUserSessionDb => {
  switch (config.t) {
    case "db-conn": {
      return ImplDb.UserSessionDb();
    }
    case "in-memory": {
      return ImplInMemory.UserSessionDb(config);
    }
    case "key-value-store": {
      return ImplKeyValueStore.UserSessionDb(config);
    }
  }
};
