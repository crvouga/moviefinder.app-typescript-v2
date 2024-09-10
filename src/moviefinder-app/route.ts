import { z } from "zod";
import * as Feed from "./feed/route";
import * as Account from "./account/route";
import * as Login from "./login/route";
import * as Media from "./media/route";

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
    type: z.literal("login"),
    child: Login.Route,
  }),
  z.object({
    type: z.literal("media"),
    child: Media.Route,
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
      feedId: null,
    },
  };
};

//
//
//
//
//
//
//

const isDict = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const toTypes = (route: unknown): string[] => {
  if (!isDict(route)) {
    return [];
  }
  const type = route.type;
  if (typeof type === "string") {
    return [type, ...toTypes(route.child)];
  }
  return [];
};

const toFriendlyName = (route: Route): string => toTypes(route).join(".");

const SEPARATOR = "___";

export const encode = (route: Route): string => {
  try {
    const encoded = btoa(JSON.stringify(route));
    const friendlyName = toFriendlyName(route);
    return `${friendlyName}${SEPARATOR}${encoded}`;
  } catch (e) {
    return "";
  }
};

export const decode = (route: string): Route | null => {
  try {
    const [_friendlyName, encoded] = route.split(SEPARATOR);

    const parsed = Route.safeParse(JSON.parse(atob(encoded ?? "")));

    if (parsed.success) {
      return parsed.data;
    }
    return null;
  } catch (e) {
    return null;
  }
};
