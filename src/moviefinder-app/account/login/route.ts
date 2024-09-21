import { z } from "zod";
import * as Sms from "./sms/route";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("sms"),
    c: Sms.Route,
  }),
]);

export type Route = z.infer<typeof Route>;
