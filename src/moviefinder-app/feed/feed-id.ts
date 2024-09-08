import { z } from "zod";

const parser = z.string().brand("FeedId");

export type FeedId = z.infer<typeof parser>;

const generate = (): FeedId => {
  return crypto.randomUUID() as FeedId;
};

const init = (maybeId: string | number): FeedId => {
  return String(maybeId) as FeedId;
};

export const FeedId = {
  parser,
  generate,
  init,
};
