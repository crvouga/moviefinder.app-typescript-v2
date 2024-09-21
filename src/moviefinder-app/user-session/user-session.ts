import { SessionId } from "src/core/req/session-id";
import { Ok, Result, unknownToErr } from "src/core/result";
import { z } from "zod";
import { UserId } from "../user/user-id";
import { UserSessionId } from "./user-session-id";

const parser = z.object({
  userSessionId: UserSessionId.parser,
  userId: UserId.parser,
  sessionId: SessionId.parser,
});

export type UserSession = {
  userSessionId: UserSessionId;
  userId: UserId;
  sessionId: SessionId;
};

const encode = (userSession: UserSession): string => {
  try {
    return JSON.stringify(userSession);
  } catch (e) {
    return "";
  }
};

const decode = (encoded: string): Result<string, UserSession> => {
  try {
    return Ok(parser.parse(JSON.parse(encoded)));
  } catch (e) {
    return unknownToErr(e);
  }
};

const random = (): UserSession => {
  return {
    userSessionId: UserSessionId.generate(),
    userId: UserId.generate(),
    sessionId: SessionId.generate(),
  };
};

export const UserSession = {
  parser,
  encode,
  decode,
  random,
};
