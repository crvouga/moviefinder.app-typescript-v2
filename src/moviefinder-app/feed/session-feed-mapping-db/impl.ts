import * as ImplKeyValueStore from "./impl-key-value-store";
import type { ISessionFeedMappingDb } from "./interface";

type Config = ImplKeyValueStore.Config & {
  t: "key-value-store";
};

export const SessionFeedMappingDb = (config: Config): ISessionFeedMappingDb => {
  switch (config.t) {
    case "key-value-store": {
      return ImplKeyValueStore.SessionFeedMappingDb(config);
    }
  }
};
