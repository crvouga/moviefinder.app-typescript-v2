import { z } from "zod";
import * as Feed from "./feed/route";

export const Route = Feed.Route;

export type Route = z.infer<typeof Route>;
