import { Logger } from "src/core/logger";
import type { Req } from "src/core/req";
import type { Ctx } from "./ctx";
import { VerifySms } from "./login/login-with-phone/verify-sms";
import { MediaDb } from "./media/media-db";
import { UserSessionDb } from "./user-session/user-session-db";

export const BaseFixture = () => {
  const logger = Logger({
    type: "console",
    namespace: ["app"],
  });
  const ctx: Ctx = {
    logger,
    mediaDb: MediaDb({
      type: "in-memory",
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

  const req: Req = {
    formData: {},
  };

  return {
    req,
    ctx,
    logger,
  };
};
