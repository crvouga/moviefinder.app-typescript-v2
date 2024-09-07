import type { Result } from "../../../core/result";
import type { UserSessionId } from "../user-session-id";
import type { UserSession } from "../user-session";

export type IUserSessionDb = {
  put: (userSession: UserSession) => Promise<Result<string, null>>;
  get: (
    userSessionId: UserSessionId,
  ) => Promise<Result<string, UserSession | null>>;
};
