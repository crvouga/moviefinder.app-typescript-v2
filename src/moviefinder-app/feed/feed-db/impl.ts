import * as ImplKeyValueStore from "./impl-key-value-store";
import type { IFeedDb } from "./interface";

type Config = ImplKeyValueStore.Config & {
  type: "key-value-store";
};

export const FeedDb = (config: Config): IFeedDb => {
  switch (config.type) {
    case "key-value-store": {
      return ImplKeyValueStore.FeedDb(config);
    }
  }
};
