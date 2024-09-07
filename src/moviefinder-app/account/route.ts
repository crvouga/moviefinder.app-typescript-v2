import { z } from "zod";

export const Route = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("account"),
  }),
]);

export type Route = z.infer<typeof Route>;
