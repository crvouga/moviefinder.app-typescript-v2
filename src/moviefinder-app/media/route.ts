import { z } from "zod";
import * as Details from "./details/route";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("details"),
    c: Details.Route,
  }),
]);

export type Route = z.infer<typeof Route>;
