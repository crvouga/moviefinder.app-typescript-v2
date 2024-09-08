import type { ILogger } from "./interface";

import * as ImplConsole from "./impl-console";

export type Config = ImplConsole.Config & {
  type: "console";
};

export const Logger = (config: Config): ILogger => {
  switch (config.type) {
    case "console": {
      return ImplConsole.Logger(config);
    }
  }
};
