import { DbConnSql } from "src/core/db-conn-sql";
import { Logger, type ILogger } from "src/core/logger";
import { FeedDb, type IFeedDb } from "./feed/feed-db";
import { KeyValueStore, type IKeyValueStore } from "./key-value-store";
import {
  VerifySms,
  type IVerifySms,
} from "./login/login-with-phone/verify-sms";
import { MediaDb, type IMediaDb } from "./media/media-db";
import {
  UserSessionDb,
  type IUserSessionDb,
} from "./user-session/user-session-db";
import { UserDb, type IUserDb } from "./user/user-db";

export type Ctx = {
  mediaDb: IMediaDb;
  verifySms: IVerifySms;
  userSessionDb: IUserSessionDb;
  logger: ILogger;
  userDb: IUserDb;
  keyValueStore: IKeyValueStore;
  feedDb: IFeedDb;
};

type Config = {
  tmdbApiReadAccessToken: string;
  databaseUrl: string;
};

export const init = async (config: Config): Promise<Ctx> => {
  const logger = Logger({
    t: "console",
    namespace: ["app"],
  });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const dbConnSql = await DbConnSql({
    t: "pg",
    databaseUrl: config.databaseUrl,
    logger: logger.child(["db-conn-sql"]),
  });

  const keyValueStore = KeyValueStore({
    t: "sql",
    dbConnSql,
  });

  const mediaDb = MediaDb({
    ...config,
    t: "tmdb-movie",
  });

  const verifySms = VerifySms({
    t: "fake",
    code: "123",
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
  });

  return {
    logger,
    feedDb,
    keyValueStore,
    mediaDb,
    verifySms,
    userSessionDb,
    userDb,
  };
};
