import * as ImplFake from "./impl-fake";
import type { IVerifySms } from "./interface";

export type Config = ImplFake.Config & {
  t: "fake";
};

export const VerifySms = (config: Config): IVerifySms => {
  switch (config.t) {
    case "fake": {
      return ImplFake.VerifySms(config);
    }
  }
};
