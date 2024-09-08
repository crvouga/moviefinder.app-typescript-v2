import { z } from "zod";
import * as Details from "./details/route";

export const Route = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("details"),
    child: Details.Route,
  }),
]);

export type Route = z.infer<typeof Route>;
