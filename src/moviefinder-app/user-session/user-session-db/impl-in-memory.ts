import { Ok } from "../../../core/result";
import type { UserSessionId } from "../user-session-id";
import type { UserSession } from "../user-session";
import type { IUserSessionDb } from "./interface";

export type Config = {
  t: "in-memory";
  sleep: (ms: number) => Promise<unknown>;
};

export const UserSessionDb = (config: Config): IUserSessionDb => {
  const userSessions = new Map<UserSessionId, UserSession>();
  return {
    async get(userSessionId) {
      await config.sleep(100);
      const got = userSessions.get(userSessionId);
      return Ok(got ?? null);
    },
    async put(userSession) {
      await config.sleep(100);
      userSessions.set(userSession.userSessionId, userSession);
      return Ok(null);
    },
    async findBySessionId(sessionId) {
      await config.sleep(100);
      for (const userSession of userSessions.values()) {
        if (userSession.sessionId === sessionId) {
          return Ok(userSession);
        }
      }
      return Ok(null);
    },
    async zap(userSessionId) {
      await config.sleep(100);
      userSessions.delete(userSessionId);
      return Ok(null);
    },
  };
};
