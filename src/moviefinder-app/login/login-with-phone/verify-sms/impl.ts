import * as ImplFake from "./impl-fake";
import type { IVerifySms } from "./interface";

export type Config = ImplFake.Config & {
  type: "fake";
};

export const VerifySms = (config: Config): IVerifySms => {
  switch (config.type) {
    case "fake": {
      return ImplFake.VerifySms(config);
    }
  }
};
