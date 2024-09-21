import { Ok, unknownToErr, type Result } from "src/core/result";
import { UserId } from "./user-id";
import { z } from "zod";

const parser = z.object({
  userId: UserId.parser,
  phone: z.string(),
});

export type User = {
  userId: UserId;
  phone: string;
};

const encode = (user: User): string => {
  try {
    return JSON.stringify(user);
  } catch (e) {
    return "";
  }
};

const decode = (encoded: string): Result<string, User> => {
  try {
    return Ok(parser.parse(JSON.parse(encoded)));
  } catch (e) {
    return unknownToErr(e);
  }
};

const random = (): User => {
  return {
    phone: String(Math.floor(Math.random() * 1000000000)),
    userId: UserId.generate(),
  };
};

export const User = {
  parser,
  encode,
  decode,
  random,
};
