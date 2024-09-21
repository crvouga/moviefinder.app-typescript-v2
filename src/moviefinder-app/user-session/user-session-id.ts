import { Ok, Result, unknownToErr } from "src/core/result";
import { z } from "zod";

const parser = z.string().brand("UserSessionId");

export type UserSessionId = z.infer<typeof parser>;

const generate = (): UserSessionId => {
  return crypto.randomUUID() as UserSessionId;
};

const decode = (encoded: string): Result<string, UserSessionId> => {
  try {
    return Ok(parser.parse(encoded));
  } catch (e) {
    return unknownToErr(e);
  }
};

export const UserSessionId = {
  generate,
  parser,
  decode,
};
