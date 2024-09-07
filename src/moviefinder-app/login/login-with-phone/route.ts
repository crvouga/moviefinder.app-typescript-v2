import { z } from "zod";

export const Route = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("send-code"),
  }),
  z.object({
    type: z.literal("clicked-send-code"),
  }),
  z.object({
    type: z.literal("verify-code"),
    phone: z.string(),
  }),
  z.object({
    type: z.literal("clicked-verify-code"),
    phone: z.string(),
  }),
]);

export type Route = z.infer<typeof Route>;
