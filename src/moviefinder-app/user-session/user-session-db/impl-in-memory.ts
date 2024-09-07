import { Ok } from "../../../core/result";
import type { UserSessionId } from "../user-session-id";
import type { UserSession } from "../user-session";
import type { IUserSessionDb } from "./interface";

export const UserSessionDb = (): IUserSessionDb => {
  const userSessions = new Map<UserSessionId, UserSession>();
  return {
    async get(userSessionId) {
      const got = userSessions.get(userSessionId);
      return Ok(got ?? null);
    },
    async put(userSession) {
      userSessions.set(userSession.userSessionId, userSession);
      return Ok(null);
    },
  };
};
