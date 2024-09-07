import { z } from "zod";

export const Route = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("account"),
  }),
  z.object({
    type: z.literal("account.load"),
  }),
]);

export type Route = z.infer<typeof Route>;
