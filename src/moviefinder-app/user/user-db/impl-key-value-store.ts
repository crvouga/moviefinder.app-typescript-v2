import type { ILogger } from "src/core/logger";
import { isErr, Ok } from "src/core/result";
import type { IKeyValueStore } from "src/moviefinder-app/key-value-store";
import { User } from "../user";
import { UserId } from "../user-id";
import type { IUserDb } from "./interface";

export type Config = {
  keyValueStore: IKeyValueStore;
  logger: ILogger;
};

export const UserDb = (config: Config): IUserDb => {
  const usersByUserId = config.keyValueStore.child(["users-by-user-id"]);
  const userIdsByPhone = config.keyValueStore.child(["user-ids-by-phone"]);
  const get = async (userId: UserId) => {
    const got = await usersByUserId.get(userId);
    if (isErr(got)) {
      return got;
    }
    if (!got.value) {
      return Ok(null);
    }
    const decoded = User.decode(got.value);
    if (isErr(decoded)) {
      return decoded;
    }
    return Ok(decoded.value);
  };
  return {
    get,
    async put(user) {
      await userIdsByPhone.set(user.phone, user.userId);
      return usersByUserId.set(user.userId, User.encode(user));
    },
    async findByPhone(input) {
      const got = await userIdsByPhone.get(input.phone);
      if (isErr(got)) {
        return got;
      }
      if (!got.value) {
        return Ok(null);
      }
      const decoded = UserId.decode(got.value);
      if (isErr(decoded)) {
        return decoded;
      }
      return get(decoded.value);
    },
  };
};
