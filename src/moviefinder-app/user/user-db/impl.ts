import type { IUserDb } from "./interface";
import * as ImplDb from "./impl-db";
import * as ImplInMemory from "./impl-in-memory";

type Config =
  | {
      t: "db-conn";
    }
  | (ImplInMemory.Config & {
      t: "in-memory";
    });

export const UserDb = (config: Config): IUserDb => {
  switch (config.t) {
    case "db-conn": {
      return ImplDb.UserDb();
    }
    case "in-memory": {
      return ImplInMemory.UserDb(config);
    }
  }
};
