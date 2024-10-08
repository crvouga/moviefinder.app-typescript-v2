import { Err } from "src/core/result";
import type { IUserSessionDb } from "./interface";

export type Config = {
  t: "db";
};

export const UserSessionDb = (): IUserSessionDb => {
  return {
    async get(userSessionId) {
      return Err("not implemented");
    },
    async put(userSession) {
      return Err("not implemented");
    },
    async findBySessionId(sessionId) {
      return Err("not implemented");
    },
    async zap(userSessionId) {
      return Err("not implemented");
    },
  };
};
