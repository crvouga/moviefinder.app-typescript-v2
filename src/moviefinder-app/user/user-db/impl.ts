import type { IUserDb } from "./interface";
import * as ImplDb from "./impl-db";
import * as ImplInMemory from "./impl-in-memory";

type Impl =
  | {
      type: "db-conn";
    }
  | (ImplInMemory.Config & {
      type: "in-memory";
    });

export const UserDb = (impl: Impl): IUserDb => {
  switch (impl.type) {
    case "db-conn": {
      return ImplDb.UserDb();
    }
    case "in-memory": {
      return ImplInMemory.UserDb(impl);
    }
  }
};
