import { DbConnSql } from "src/core/db-conn-sql";
import { Logger, type ILogger } from "src/core/logger";
import { TimeSpan } from "src/core/time-span";
import { VerifySms, type IVerifySms } from "./account/login/sms/verify-sms";
import { FeedDb, type IFeedDb } from "./feed/feed-db";
import {
  SessionFeedMappingDb,
  type ISessionFeedMappingDb,
} from "./feed/session-feed-mapping-db";
import { KeyValueStore, type IKeyValueStore } from "./key-value-store";
import { MediaDb, type IMediaDb } from "./media/media-db";
import {
  UserSessionDb,
  type IUserSessionDb,
} from "./user-session/user-session-db";
import type { User } from "./user/user";
import { UserDb, type IUserDb } from "./user/user-db";

export type Ctx = {
  mediaDb: IMediaDb;
  verifySms: IVerifySms;
  userSessionDb: IUserSessionDb;
  logger: ILogger;
  userDb: IUserDb;
  keyValueStore: IKeyValueStore;
  feedDb: IFeedDb;
  sessionFeedMappingDb: ISessionFeedMappingDb;
  currentUser: User | null;
  sleep: (timeSpan: TimeSpan) => Promise<unknown>;
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

  const sleep = async (timeSpan: TimeSpan) => {
    await new Promise((resolve) => {
      setTimeout(resolve, TimeSpan.toMilliseconds(timeSpan));
    });
  };

  const dbConnSql = await DbConnSql({
    t: "sqlite",
    databaseUrl: config.databaseUrl,
    // logger: Logger({ t: "noop" }),
    logger: logger.child(["db-conn-sql"]),
  });

  const keyValueStore = KeyValueStore({
    t: "sql",
    dbConnSql,
  });

  const mediaDb = MediaDb({
    ...config,
    t: "tmdb-movie",
    logger: logger.child(["media-db-tmdb-movie"]),
  });

  const verifySms = VerifySms({
    t: "fake",
    code: "123",
    logger: logger.child(["verify-sms"]),
    sleep,
  });

  const userSessionDb = UserSessionDb({
    t: "key-value-store",
    keyValueStore,
    logger: Logger({ t: "noop" }),
  });

  const userDb = UserDb({
    t: "key-value-store",
    keyValueStore,
    logger: Logger({ t: "noop" }),
  });

  const feedDb = FeedDb({
    t: "key-value-store",
    keyValueStore,
    logger: Logger({ t: "noop" }),
    // logger: logger.child(["feed-db"]),
  });

  const sessionFeedMappingDb = SessionFeedMappingDb({
    t: "key-value-store",
    keyValueStore,
  });

  return {
    sleep,
    logger,
    feedDb,
    sessionFeedMappingDb,
    keyValueStore,
    mediaDb,
    verifySms,
    userSessionDb,
    userDb,
    currentUser: null,
  };
};
