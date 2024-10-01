import { z } from "zod";
import * as Login from "./login/route";
import * as Logout from "./logout/route";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("index"),
  }),
  z.object({
    t: z.literal("login"),
    c: Login.Route,
  }),
  z.object({
    t: z.literal("logout"),
    c: Logout.Route,
  }),
]);

export type Route = z.infer<typeof Route>;
