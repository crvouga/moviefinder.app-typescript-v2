import { z } from "zod";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("account"),
  }),
]);

export type Route = z.infer<typeof Route>;
