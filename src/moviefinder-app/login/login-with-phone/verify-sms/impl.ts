import * as ImplFake from "./impl-fake";
import type { IVerifySms } from "./interface";

export type Impl = ImplFake.Config & {
  type: "fake";
};

export const VerifySms = (impl: Impl): IVerifySms => {
  switch (impl.type) {
    case "fake": {
      return ImplFake.VerifySms(impl);
    }
  }
};
