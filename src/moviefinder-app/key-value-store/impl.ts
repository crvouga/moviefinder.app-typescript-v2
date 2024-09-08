import * as ImplSql from "./impl-sql";

export type Config = ImplSql.Config & {
  type: "sql";
};

export const KeyValueStore = (config: Config) => {
  switch (config.type) {
    case "sql": {
      return ImplSql.KeyValueStore(config);
    }
  }
};
