import { z } from "zod";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("send-code"),
  }),
  z.object({
    t: z.literal("clicked-send-code"),
  }),
  z.object({
    t: z.literal("verify-code"),
    phone: z.string(),
  }),
  z.object({
    t: z.literal("clicked-verify-code"),
    phone: z.string(),
  }),
]);

export type Route = z.infer<typeof Route>;
