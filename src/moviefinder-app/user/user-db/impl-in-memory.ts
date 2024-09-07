import { Ok } from "../../../core/result";
import type { User } from "../user";
import type { UserId } from "../user-id";
import type { IUserDb } from "./interface";

export type Config = {
  sleep: (ms: number) => Promise<unknown>;
};

export const UserDb = (config: Config): IUserDb => {
  const usersByUserId = new Map<UserId, User>();
  return {
    async get(userId) {
      await config.sleep(100);
      const got = usersByUserId.get(userId);
      return Ok(got ?? null);
    },
    async put(user) {
      await config.sleep(100);
      usersByUserId.set(user.userId, user);
      return Ok(null);
    },
    async findByPhone(input) {
      await config.sleep(100);
      for (const user of usersByUserId.values()) {
        if (user.phone === input.phone) {
          return Ok(user);
        }
      }
      return Ok(null);
    },
  };
};
