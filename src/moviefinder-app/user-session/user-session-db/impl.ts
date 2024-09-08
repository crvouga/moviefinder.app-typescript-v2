import type { IUserSessionDb } from "./interface";
import * as ImplDb from "./impl-db";
import * as ImplInMemory from "./impl-in-memory";

type Config =
  | {
      type: "db-conn";
    }
  | (ImplInMemory.Config & {
      type: "in-memory";
    });

export const UserSessionDb = (config: Config): IUserSessionDb => {
  switch (config.type) {
    case "db-conn": {
      return ImplDb.UserSessionDb();
    }
    case "in-memory": {
      return ImplInMemory.UserSessionDb(config);
    }
  }
};
