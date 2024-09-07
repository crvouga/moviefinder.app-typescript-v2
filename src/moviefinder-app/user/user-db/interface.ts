import type { Result } from "../../../core/result";
import type { User } from "../user";
import type { UserId } from "../user-id";

export type IUserDb = {
  put: (user: User) => Promise<Result<string, null>>;
  get: (userId: UserId) => Promise<Result<string, User | null>>;
  findByPhone: (input: {
    phone: string;
  }) => Promise<Result<string, User | null>>;
};
