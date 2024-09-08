import * as ImplPg from "./impl-pg";
import type { IDbConnSql } from "./interface";

export type Config = ImplPg.Config & {
  type: "pg";
};

export const DbConnSql = async (config: Config): Promise<IDbConnSql> => {
  switch (config.type) {
    case "pg": {
      return ImplPg.DbConnSql(config);
    }
  }
};
