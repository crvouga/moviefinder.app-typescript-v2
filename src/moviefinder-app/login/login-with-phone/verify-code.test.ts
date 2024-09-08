import { describe, expect, test } from "bun:test";
import { unwrap } from "src/core/result";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { verifyCode } from "./verify-code";

const Fixture = () => {
  const f = BaseFixture();
  const phone = "555-555-5555";
  return {
    ...f,
    phone,
  };
};

describe.skip("verify code", () => {
  test("ok", async () => {
    const f = Fixture();
    const verify = await verifyCode({
      code: f.verifySmsCode,
      ctx: f.ctx,
      sessionId: f.req.sessionId,
      phone: f.phone,
    });
    expect(verify.type).toBe("ok");
  });

  test("creates new user", async () => {
    const f = Fixture();
    const before = unwrap(await f.ctx.userDb.findByPhone({ phone: f.phone }));
    await verifyCode({
      code: f.verifySmsCode,
      ctx: f.ctx,
      phone: f.phone,
      sessionId: f.req.sessionId,
    });
    const after = unwrap(await f.ctx.userDb.findByPhone({ phone: f.phone }));
    expect(before).toBe(null);
    expect(after).not.toBe(null);
  });

  test("creates new user session", async () => {
    const f = Fixture();
    const before = unwrap(
      await f.ctx.userSessionDb.findBySessionId(f.req.sessionId),
    );
    await verifyCode({
      code: f.verifySmsCode,
      ctx: f.ctx,
      phone: f.phone,
      sessionId: f.req.sessionId,
    });
    const after = unwrap(
      await f.ctx.userSessionDb.findBySessionId(f.req.sessionId),
    );
    expect(before).toBe(null);
    expect(after).not.toBe(null);
  });

  test("new user and new user session are associated ", async () => {
    const f = Fixture();

    await verifyCode({
      code: f.verifySmsCode,
      ctx: f.ctx,
      phone: f.phone,
      sessionId: f.req.sessionId,
    });
    const userSession = unwrap(
      await f.ctx.userSessionDb.findBySessionId(f.req.sessionId),
    );
    const user = unwrap(await f.ctx.userDb.findByPhone({ phone: f.phone }));
    expect(user?.userId).not.toBeNull();
    if (user?.userId) {
      expect(userSession?.userId).toEqual(user?.userId);
    }
  });
});
