import type { SessionId } from "src/core/req/session-id";
import type { UserId } from "../user/user-id";
import type { UserSessionId } from "./user-session-id";

export type UserSession = {
  userSessionId: UserSessionId;
  userId: UserId;
  sessionId: SessionId;
};
