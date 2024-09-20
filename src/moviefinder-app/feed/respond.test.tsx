import { describe } from "bun:test";

import { BaseFixture } from "../fixture";

export const Fixture = () => {
  const f = BaseFixture();
  return {
    ...f,
  };
};

describe(import.meta.file, () => {});
