import type { SessionId } from "src/core/req/session-id";
import type { Result } from "../../../core/result";
import type { UserSession } from "../user-session";
import type { UserSessionId } from "../user-session-id";

export type IUserSessionDb = {
  put: (userSession: UserSession) => Promise<Result<string, null>>;
  get: (
    userSessionId: UserSessionId,
  ) => Promise<Result<string, UserSession | null>>;
  findBySessionId: (
    sessionId: SessionId,
  ) => Promise<Result<string, UserSession | null>>;
};
