import { DbConnSql } from "src/core/db-conn-sql";
import { Logger, type ILogger } from "src/core/logger";
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
};

type Config = {
  tmdbApiReadAccessToken: string;
  databaseUrl: string;
};

export const init = async (config: Config): Promise<Ctx> => {
  const logger = Logger({
    type: "console",
    namespace: ["app"],
  });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const dbConnSql = await DbConnSql({
    type: "pg",
    databaseUrl: config.databaseUrl,
    logger: logger.child(["db-conn-sql"]),
  });

  const keyValueStore = KeyValueStore({
    type: "sql",
    dbConnSql,
  });

  const mediaDb = MediaDb({
    ...config,
    type: "tmdb-movie",
  });

  const verifySms = VerifySms({
    type: "fake",
    code: "123",
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

  return {
    logger,
    keyValueStore,
    mediaDb,
    verifySms,
    userSessionDb,
    userDb,
  };
};
