import { z } from "zod";
import * as Feed from "./feed/route";
import * as Account from "./account/route";
import * as Login from "./login/route";
import * as Media from "./media/route";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("feed"),
    c: Feed.Route,
  }),
  z.object({
    t: z.literal("account"),
    c: Account.Route,
  }),
  z.object({
    t: z.literal("login"),
    c: Login.Route,
  }),
  z.object({
    t: z.literal("media"),
    c: Media.Route,
  }),
  z.object({
    t: z.literal("unknown"),
  }),
]);

export type Route = z.infer<typeof Route>;

export const init = (): Route => {
  return {
    t: "feed",
    c: {
      t: "index",
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

  const type = route.t;

  if (typeof type === "string") {
    return [type, ...toTypes(route.c)];
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

export const decode = (route: string): Route => {
  try {
    const [_friendlyName, encoded] = route.split(SEPARATOR);
    const parsed = Route.parse(JSON.parse(atob(encoded ?? "")));
    return parsed;
  } catch (e) {
    return {
      t: "unknown",
    };
  }
};
