import * as ImplPostgres from "./impl-postgres";
import type { IDbConnSql } from "./interface";

export type Config = ImplPostgres.Config & {
  t: "postgres";
};

export const DbConnSql = async (config: Config): Promise<IDbConnSql> => {
  switch (config.t) {
    case "postgres": {
      return ImplPostgres.DbConnSql(config);
    }
  }
};
