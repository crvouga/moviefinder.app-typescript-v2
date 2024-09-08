import { z } from "zod";

const ALL = ["movie", "tv"] as const;

const parser = z.enum(ALL);

export type MediaType = z.infer<typeof parser>;

export const MediaType = {
  parser,
  ALL,
};
