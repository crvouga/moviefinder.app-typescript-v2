import { describe, expect, test } from "bun:test";
import { SessionId } from "src/core/req/session-id";
import { Ok } from "src/core/result";
import { BaseFixture } from "src/moviefinder-app/fixture";
import { UserSession } from "../user-session";
import { UserSessionDb, type Config } from "./impl";

const Fixture = (config: Config) => {
  const userSessionDb = UserSessionDb(config);
  return {
    userSessionDb,
  };
};

const Fixtures = async (): Promise<ReturnType<typeof Fixture>[]> => {
  const f = await BaseFixture();
  const configs: Config[] = [
    {
      t: "in-memory",
      sleep: async () => {},
    },
    {
      t: "key-value-store",
      keyValueStore: f.ctx.keyValueStore,
      logger: f.logger,
    },
  ];

  return configs.map(Fixture);
};

describe(import.meta.file, () => {
  test("get and put", async () => {
    for (const f of await Fixtures()) {
      const userSession = UserSession.random();
      const before = await f.userSessionDb.get(userSession.userSessionId);
      const put = await f.userSessionDb.put(userSession);
      const after = await f.userSessionDb.get(userSession.userSessionId);

      expect(before).toEqual(Ok(null));
      expect(put).toEqual(Ok(null));
      expect(after).toEqual(Ok(userSession));
    }
  });

  test("updating", async () => {
    for (const f of await Fixtures()) {
      const userSession = UserSession.random();
      const updated: UserSession = {
        ...userSession,
        sessionId: SessionId.generate(),
      };

      await f.userSessionDb.put(userSession);

      const before = await f.userSessionDb.get(userSession.userSessionId);
      const put = await f.userSessionDb.put(updated);
      const after = await f.userSessionDb.get(userSession.userSessionId);

      expect(before).toEqual(Ok(userSession));
      expect(put).toEqual(Ok(null));
      expect(after).toEqual(Ok(updated));
    }
  });

  test("find by session id", async () => {
    for (const f of await Fixtures()) {
      const userSession = UserSession.random();
      const before = await f.userSessionDb.findBySessionId(
        userSession.sessionId,
      );
      await f.userSessionDb.put(userSession);
      const after = await f.userSessionDb.findBySessionId(
        userSession.sessionId,
      );

      expect(before).toEqual(Ok(null));
      expect(after).toEqual(Ok(userSession));
    }
  });

  test("zap", async () => {
    for (const f of await Fixtures()) {
      const userSession = UserSession.random();
      await f.userSessionDb.put(userSession);
      const before = await f.userSessionDb.get(userSession.userSessionId);
      const zap = await f.userSessionDb.zap(userSession.userSessionId);
      const after = await f.userSessionDb.get(userSession.userSessionId);

      expect(before).toEqual(Ok(userSession));
      expect(zap).toEqual(Ok(null));
      expect(after).toEqual(Ok(null));
    }
  });
});
