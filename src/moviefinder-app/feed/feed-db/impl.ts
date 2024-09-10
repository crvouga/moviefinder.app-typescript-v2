import * as ImplKeyValueStore from "./impl-key-value-store";
import type { IFeedDb } from "./interface";

type Config = ImplKeyValueStore.Config & {
  t: "key-value-store";
};

export const FeedDb = (config: Config): IFeedDb => {
  switch (config.t) {
    case "key-value-store": {
      return ImplKeyValueStore.FeedDb(config);
    }
  }
};
