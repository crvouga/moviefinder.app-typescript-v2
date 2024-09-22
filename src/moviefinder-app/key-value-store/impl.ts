import * as ImplInMemory from "./impl-in-memory";
import * as ImplSql from "./impl-sql";

export type Config =
  | (ImplSql.Config & {
      t: "sql";
    })
  | (ImplInMemory.Config & {
      t: "in-memory";
    });

export const KeyValueStore = (config: Config) => {
  switch (config.t) {
    case "sql": {
      return ImplSql.KeyValueStore(config);
    }
    case "in-memory": {
      return ImplInMemory.KeyValueStore(config);
    }
  }
};
