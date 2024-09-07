import { Logger } from "src/core/logger";
import type { Req } from "src/core/req";
import type { Ctx } from "./ctx";
import { VerifySms } from "./login/login-with-phone/verify-sms";
import { MediaDb } from "./media/media-db";
import { UserSessionDb } from "./user-session/user-session-db";
import { UserDb } from "./user/user-db";
import { SessionId } from "src/core/req/session-id";

export const BaseFixture = () => {
  const logger = Logger({
    type: "console",
    namespace: ["app"],
  });
  const verifySmsCode = "123";
  const sleep = async () => {};
  const ctx: Ctx = {
    logger,
    mediaDb: MediaDb({
      type: "in-memory",
    }),
    verifySms: VerifySms({
      type: "fake",
      code: verifySmsCode,
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

  const req: Req = {
    formData: {},
    sessionId: SessionId.generate(),
  };

  return {
    req,
    ctx,
    verifySmsCode,
    logger,
  };
};
