import { isErr, Ok, type Result } from "src/core/result";
import type { Ctx } from "src/moviefinder-app/ctx";
import { UserId } from "src/moviefinder-app/user/user-id";
import type { VerifyCodeError } from "./verify-sms";
import { UserSessionId } from "src/moviefinder-app/user-session/user-session-id";
import type { SessionId } from "src/core/req/session-id";

export const verifyCode = async ({
  code,
  ctx,
  phone,
  sessionId,
}: {
  sessionId: SessionId;
  ctx: Ctx;
  phone: string;
  code: string;
}): Promise<Result<VerifyCodeError, null>> => {
  ctx.logger.info(`Verifying code ${code} for phone ${phone}`);

  const verifiedCode = await ctx.verifySms.verifyCode({
    code,
    phone,
  });

  if (isErr(verifiedCode)) {
    return verifiedCode;
  }

  const userId = UserId.generate();

  await ctx.userDb.put({
    phone,
    userId,
  });

  await ctx.userSessionDb.put({
    sessionId,
    userId,
    userSessionId: UserSessionId.generate(),
  });

  return Ok(null);
};
