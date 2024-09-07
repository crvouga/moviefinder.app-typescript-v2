import { z } from "zod";

export const Route = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("send-code"),
  }),
  z.object({
    type: z.literal("verify-code"),
  }),
]);

export type Route = z.infer<typeof Route>;
