import type { ILogger } from "./interface";

import * as ImplConsole from "./impl-console";

export type Impl = {
  type: "console";
};

export const Logger = (impl: Impl): ILogger => {
  switch (impl.type) {
    case "console": {
      return ImplConsole.Logger();
    }
  }
};
