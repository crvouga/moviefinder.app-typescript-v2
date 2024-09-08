import { DbConnSql } from "src/core/db-conn-sql";
import { Logger } from "src/core/logger";
import type { Req } from "src/core/req";
import { SessionId } from "src/core/req/session-id";
import {
  DATABASE_URL,
  TMDB_API_READ_ACCESS_TOKEN,
} from "src/moviefinder-app/env";
import type { Ctx } from "./ctx";
import { VerifySms } from "./login/login-with-phone/verify-sms";
import { MediaDb } from "./media/media-db";
import { UserSessionDb } from "./user-session/user-session-db";
import { UserDb } from "./user/user-db";
import { KeyValueStore } from "./key-value-store";
import { FeedDb } from "./feed/feed-db";

export const BaseFixture = async () => {
  const logger = Logger({
    type: "console",
    namespace: ["app"],
  });

  const verifySmsCode = "123";

  const sleep = async () => {};

  const dbConnSql = await DbConnSql({
    type: "pg",
    databaseUrl: DATABASE_URL,
    logger,
  });

  const keyValueStore = KeyValueStore({
    type: "sql",
    dbConnSql,
  });

  const mediaDb = MediaDb({
    type: "in-memory",
  });

  const verifySms = VerifySms({
    type: "fake",
    code: verifySmsCode,
    logger: logger.child(["verify-sms"]),
    sleep,
  });

  const userSessionDb = UserSessionDb({
    type: "in-memory",
    sleep,
  });

  const userDb = UserDb({
    type: "in-memory",
    sleep,
  });

  const feedDb = FeedDb({
    type: "key-value-store",
    keyValueStore,
  });

  const ctx: Ctx = {
    logger,
    keyValueStore,
    mediaDb,
    verifySms,
    userSessionDb,
    userDb,
    feedDb,
  };

  const req: Req = {
    formData: {},
    sessionId: SessionId.generate(),
  };

  return {
    req,
    ctx,
    verifySmsCode,
    logger,
    dbConnSql,
    databaseUrl: DATABASE_URL,
    tmdbApiReadAccessToken: TMDB_API_READ_ACCESS_TOKEN,
  };
};
