import type { ILogger } from "./interface";

import * as ImplConsole from "./impl-console";

export type Config = ImplConsole.Config & {
  t: "console";
};

export const Logger = (config: Config): ILogger => {
  switch (config.t) {
    case "console": {
      return ImplConsole.Logger(config);
    }
  }
};
