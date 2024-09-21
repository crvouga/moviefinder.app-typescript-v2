import { Ok, Result, unknownToErr } from "src/core/result";
import { z } from "zod";

const parser = z.string().brand("SessionId");

export type SessionId = z.infer<typeof parser>;

const generate = (): SessionId => {
  return crypto.randomUUID() as SessionId;
};

const decode = (encoded: string): Result<string, SessionId> => {
  try {
    return Ok(parser.parse(encoded));
  } catch (e) {
    return unknownToErr(e);
  }
};

const is = (value: unknown): value is SessionId => {
  return parser.safeParse(value).success;
};

export const SessionId = {
  generate,
  parser,
  decode,
  is,
};
