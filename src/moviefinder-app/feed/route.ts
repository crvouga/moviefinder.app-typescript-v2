import { z } from "zod";
import { FeedId } from "./feed-id";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("index"),
  }),
  z.object({
    t: z.literal("feed"),
    feedId: FeedId.parser,
  }),
  z.object({
    t: z.literal("load-more"),
    feedId: FeedId.parser,
  }),
  z.object({
    t: z.literal("controls"),
    feedId: FeedId.parser,
  }),
  z.object({
    t: z.literal("changed-slide"),
    feedId: FeedId.parser,
  }),
]);

export type Route = z.infer<typeof Route>;
