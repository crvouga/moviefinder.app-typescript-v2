import * as ImplSql from "./impl-sql";

export type Config = ImplSql.Config & {
  t: "sql";
};

export const KeyValueStore = (config: Config) => {
  switch (config.t) {
    case "sql": {
      return ImplSql.KeyValueStore(config);
    }
  }
};
