import type { IUserSessionDb } from "./interface";
import * as ImplDb from "./impl-db";
import * as ImplInMemory from "./impl-in-memory";

type Impl =
  | {
      type: "db-conn";
    }
  | (ImplInMemory.Config & {
      type: "in-memory";
    });

export const UserSessionDb = (impl: Impl): IUserSessionDb => {
  switch (impl.type) {
    case "db-conn": {
      return ImplDb.UserSessionDb();
    }
    case "in-memory": {
      return ImplInMemory.UserSessionDb(impl);
    }
  }
};
