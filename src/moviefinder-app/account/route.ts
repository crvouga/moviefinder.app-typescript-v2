import { z } from "zod";
import * as Login from "./login/route";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("account"),
  }),
  z.object({
    t: z.literal("login"),
    c: Login.Route,
  }),
]);

export type Route = z.infer<typeof Route>;
