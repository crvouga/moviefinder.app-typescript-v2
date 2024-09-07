import type { UserSessionDb } from "./user-session-db";
import { UserSessionDbImplDb } from "./user-session-db-impl-db";

type Impl = {
  t: "db-conn";
};

export const UserSessionDbImpl = (impl: Impl): UserSessionDb => {
  switch (impl.t) {
    case "db-conn": {
      return UserSessionDbImplDb();
    }
  }
};
