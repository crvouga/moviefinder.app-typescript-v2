import * as ImplPostgres from "./impl-postgres";
import * as ImplSqlite from "./impl-sqlite";
import type { IDbConnSql } from "./interface";

export type Config = ImplPostgres.Config | ImplSqlite.Config;

export const DbConnSql = async (config: Config): Promise<IDbConnSql> => {
  switch (config.t) {
    case "postgres": {
      return ImplPostgres.DbConnSql(config);
    }
    case "sqlite": {
      return ImplSqlite.DbConnSql(config);
    }
  }
};
