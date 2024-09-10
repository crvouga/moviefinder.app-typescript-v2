import { z } from "zod";
import * as LoginWithPhone from "./login-with-phone/route";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("login-with-phone"),
    child: LoginWithPhone.Route,
  }),
]);

export type Route = z.infer<typeof Route>;
