import type { IUserSessionDb } from "./interface";
import * as ImplDb from "./impl-db";
import * as ImplInMemory from "./impl-in-memory";

type Config =
  | {
      t: "db-conn";
    }
  | (ImplInMemory.Config & {
      t: "in-memory";
    });

export const UserSessionDb = (config: Config): IUserSessionDb => {
  switch (config.t) {
    case "db-conn": {
      return ImplDb.UserSessionDb();
    }
    case "in-memory": {
      return ImplInMemory.UserSessionDb(config);
    }
  }
};
