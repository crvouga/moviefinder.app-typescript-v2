import type { ILogger } from "src/core/logger";
import { isErr, Ok } from "src/core/result";
import type { IKeyValueStore } from "src/moviefinder-app/key-value-store";
import { UserSession } from "../user-session";
import { UserSessionId } from "../user-session-id";
import type { IUserSessionDb } from "./interface";

export type Config = {
  keyValueStore: IKeyValueStore;
  logger: ILogger;
};

export const UserSessionDb = (config: Config): IUserSessionDb => {
  const byId = config.keyValueStore.child(["user-sessions-by-user-session-id"]);
  const bySessionId = config.keyValueStore.child([
    "user-sessions-by-session-id",
  ]);
  const get = async (userSessionId: UserSessionId) => {
    const got = await byId.get(userSessionId);
    if (isErr(got)) {
      return got;
    }
    if (!got.value) {
      return Ok(null);
    }
    return UserSession.decode(got.value);
  };
  return {
    get,
    async put(userSession) {
      await bySessionId.set(userSession.sessionId, userSession.userSessionId);
      const set = await byId.set(
        userSession.userSessionId,
        UserSession.encode(userSession),
      );
      return set;
    },
    async findBySessionId(sessionId) {
      const got = await bySessionId.get(sessionId);
      if (isErr(got)) {
        return got;
      }
      if (!got.value) {
        return Ok(null);
      }
      const decoded = UserSessionId.decode(got.value);
      if (isErr(decoded)) {
        return decoded;
      }
      return get(decoded.value);
    },
  };
};
