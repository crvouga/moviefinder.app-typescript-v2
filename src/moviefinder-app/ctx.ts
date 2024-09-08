import { Logger, type ILogger } from "src/core/logger";
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
};

type Config = {
  tmdbApiReadAccessToken: string;
};

export const init = (config: Config): Ctx => {
  const logger = Logger({
    type: "console",
    namespace: ["app"],
  });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return {
    logger,
    mediaDb: MediaDb({
      ...config,
      type: "tmdb-movie",
    }),
    verifySms: VerifySms({
      type: "fake",
      code: "123",
      logger: logger.child(["verify-sms"]),
      sleep,
    }),
    userSessionDb: UserSessionDb({
      type: "in-memory",
      sleep,
    }),
    userDb: UserDb({
      type: "in-memory",
      sleep,
    }),
  };
};
