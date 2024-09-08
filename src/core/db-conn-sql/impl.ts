import * as ImplPg from "./impl-pg";
import type { IDbConnSql } from "./interface";

export type Impl = ImplPg.Config & {
  type: "pg";
};

export const DbConnSql = async (impl: Impl): Promise<IDbConnSql> => {
  switch (impl.type) {
    case "pg": {
      return ImplPg.DbConnSql(impl);
    }
  }
};
