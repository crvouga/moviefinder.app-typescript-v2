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

export type Ctx = {
  mediaDb: IMediaDb;
  verifySms: IVerifySms;
  userSessionDb: IUserSessionDb;
  logger: ILogger;
};

export const init = (): Ctx => {
  const logger = Logger({
    type: "console",
    namespace: ["app"],
  });

  return {
    logger,
    mediaDb: MediaDb({
      type: "tmdb-movie",
    }),
    verifySms: VerifySms({
      type: "fake",
      code: "123",
      logger: logger.child(["verify-sms"]),
    }),
    userSessionDb: UserSessionDb({
      type: "in-memory",
    }),
  };
};
