import { z } from "zod";

export const Route = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("feed"),
  }),
  z.object({
    type: z.literal("feed.load-more"),
  }),
  z.object({
    type: z.literal("feed.controls"),
  }),
]);

export type Route = z.infer<typeof Route>;
