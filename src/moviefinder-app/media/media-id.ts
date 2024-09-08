import { z } from "zod";

const parser = z.string().brand("MediaId");

export type MediaId = z.infer<typeof parser>;

const generate = (): MediaId => {
  return crypto.randomUUID() as MediaId;
};

const init = (maybeId: string | number): MediaId => {
  return String(maybeId) as MediaId;
};

export const MediaId = {
  parser,
  generate,
  init,
};
