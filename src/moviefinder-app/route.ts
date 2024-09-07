import { z } from "zod";
import * as Feed from "./feed/route";
import * as Account from "./account/route";

export const Route = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("feed"),
    child: Feed.Route,
  }),
  z.object({
    type: z.literal("account"),
    child: Account.Route,
  }),
  z.object({
    type: z.literal("unknown"),
  }),
]);

export type Route = z.infer<typeof Route>;

export const init = (): Route => {
  return {
    type: "feed",
    child: {
      type: "feed",
    },
  };
};

export const encode = (route: Route): string => {
  try {
    return btoa(JSON.stringify(route));
  } catch (e) {
    return "";
  }
};

export const decode = (route: string): Route | null => {
  try {
    const parsed = Route.safeParse(JSON.parse(atob(route)));

    if (parsed.success) {
      return parsed.data;
    }
    return null;
  } catch (e) {
    return null;
  }
};
