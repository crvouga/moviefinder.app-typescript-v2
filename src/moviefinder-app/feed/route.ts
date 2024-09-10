import { z } from "zod";
import { FeedId } from "./feed-id";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("feed"),
    feedId: FeedId.parser.nullable(),
  }),
  z.object({
    t: z.literal("feed.load-more"),
    feedId: FeedId.parser,
  }),
  z.object({
    t: z.literal("feed.controls"),
    feedId: FeedId.parser,
  }),
]);

export type Route = z.infer<typeof Route>;
