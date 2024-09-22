import { DbConnSql } from "src/core/db-conn-sql";
import { Logger } from "src/core/logger";
import type { Req } from "src/core/req";
import { SessionId } from "src/core/req/session-id";
import {
  DATABASE_URL,
  TMDB_API_READ_ACCESS_TOKEN,
} from "src/moviefinder-app/env";
import type { Ctx } from "./ctx";
import { FeedDb } from "./feed/feed-db";
import { KeyValueStore } from "./key-value-store";
import { MediaDb } from "./media/media-db";
import { UserSessionDb } from "./user-session/user-session-db";
import { UserDb } from "./user/user-db";
import { SessionFeedMappingDb } from "./feed/session-feed-mapping-db";
import { VerifySms } from "./account/login/sms/verify-sms";

export const BaseFixture = async () => {
  const testEnv: "unit" | "integration" =
    import.meta.env.INTEGRATION_TEST === "true" ? "integration" : "unit";

  const logger = Logger({
    t: "noop",
  });

  const verifySmsCode = "123";

  const sleep = async () => {};

  const dbConnSql = await DbConnSql({
    t: "pg",
    databaseUrl: DATABASE_URL,
    logger,
  });

  const keyValueStore = KeyValueStore({
    t: "sql",
    dbConnSql,
  });

  const mediaDb = MediaDb({
    t: "in-memory",
  });

  const verifySms = VerifySms({
    t: "fake",
    code: verifySmsCode,
    logger: logger.child(["verify-sms"]),
    sleep,
  });

  const userSessionDb = UserSessionDb({
    t: "in-memory",
    sleep,
  });

  const userDb = UserDb({
    t: "in-memory",
    sleep,
  });

  const feedDb = FeedDb({
    t: "key-value-store",
    keyValueStore,
    logger: logger.child(["feed-db"]),
  });

  const sessionFeedMappingDb = SessionFeedMappingDb({
    t: "key-value-store",
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
    sessionFeedMappingDb,
    currentUser: null,
    sleep,
  };

  const req: Req = {
    formData: {},
    sessionId: SessionId.generate(),
  };

  return {
    testEnv,
    req,
    ctx,
    verifySmsCode,
    logger,
    dbConnSql,
    databaseUrl: DATABASE_URL,
    tmdbApiReadAccessToken: TMDB_API_READ_ACCESS_TOKEN,
  };
};
