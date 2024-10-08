import { describe, expect, test } from "bun:test";
import { unwrap } from "src/core/result";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { verifyCode } from "./verify-code";

const Fixture = async () => {
  const f = await BaseFixture();
  const phone = "555-555-5555";
  return {
    ...f,
    phone,
  };
};

describe("verify code", () => {
  test("ok", async () => {
    const f = await Fixture();
    const verify = await verifyCode({
      code: f.verifySmsCode,
      ctx: f.ctx,
      sessionId: f.req.sessionId,
      phone: f.phone,
    });
    expect(verify.t).toBe("ok");
  });

  test("creates new user", async () => {
    const f = await Fixture();
    const before = unwrap(
      await f.ctx.userDb.findByPhone({ phone: f.phone }),
      null,
    );
    await verifyCode({
      code: f.verifySmsCode,
      ctx: f.ctx,
      phone: f.phone,
      sessionId: f.req.sessionId,
    });
    const after = unwrap(
      await f.ctx.userDb.findByPhone({ phone: f.phone }),
      null,
    );
    expect(before).toBe(null);
    expect(after).not.toBe(null);
  });

  test("creates new user session", async () => {
    const f = await Fixture();
    const before = unwrap(
      await f.ctx.userSessionDb.findBySessionId(f.req.sessionId),
      null,
    );
    await verifyCode({
      code: f.verifySmsCode,
      ctx: f.ctx,
      phone: f.phone,
      sessionId: f.req.sessionId,
    });
    const after = unwrap(
      await f.ctx.userSessionDb.findBySessionId(f.req.sessionId),
      null,
    );
    expect(before).toBe(null);
    expect(after).not.toBe(null);
  });

  test("new user and new user session are associated ", async () => {
    const f = await Fixture();

    await verifyCode({
      code: f.verifySmsCode,
      ctx: f.ctx,
      phone: f.phone,
      sessionId: f.req.sessionId,
    });
    const userSession = unwrap(
      await f.ctx.userSessionDb.findBySessionId(f.req.sessionId),
      null,
    );
    const user = unwrap(
      await f.ctx.userDb.findByPhone({ phone: f.phone }),
      null,
    );
    expect(user?.userId).not.toBeNull();
    if (user?.userId) {
      expect(userSession?.userId).toEqual(user?.userId);
    }
  });
});
