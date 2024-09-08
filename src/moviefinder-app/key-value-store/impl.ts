import * as ImplSql from "./impl-sql";

export type Impl = ImplSql.Config & {
  type: "sql";
};

export const KeyValueStore = (impl: Impl) => {
  switch (impl.type) {
    case "sql": {
      return ImplSql.KeyValueStore(impl);
    }
  }
};
