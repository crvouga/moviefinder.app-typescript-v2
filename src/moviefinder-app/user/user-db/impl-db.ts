import { Err } from "src/core/result";
import type { IUserDb } from "./interface";

export const UserDb = (): IUserDb => {
  return {
    async get(userId) {
      return Err("not implemented");
    },
    async put(user) {
      return Err("not implemented");
    },
    async findByPhone(input) {
      return Err("not implemented");
    },
  };
};
