import { Ok, Result, unknownToErr } from "src/core/result";
import { z } from "zod";

const parser = z.string().brand("UserId");

export type UserId = z.infer<typeof parser>;

const generate = (): UserId => {
  return crypto.randomUUID() as UserId;
};

const decode = (encoded: string): Result<string, UserId> => {
  try {
    return Ok(parser.parse(encoded));
  } catch (e) {
    return unknownToErr(e);
  }
};

export const UserId = {
  generate,
  parser,
  decode,
};
