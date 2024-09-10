import { z } from "zod";
import { MediaId } from "../media-id";
import { MediaType } from "../media-type";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("index"),
    mediaId: MediaId.parser,
    mediaType: MediaType.parser,
    mediaTitle: z.string(),
  }),
  z.object({
    t: z.literal("load"),
    mediaId: MediaId.parser,
    mediaType: MediaType.parser,
    mediaTitle: z.string(),
  }),
]);
export type Route = z.infer<typeof Route>;
