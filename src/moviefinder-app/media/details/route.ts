import { z } from "zod";
import { MediaId } from "../media-id";
import { MediaType } from "../media-type";

export const Route = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("index"),
    mediaId: MediaId.parser,
    mediaType: MediaType.parser,
    mediaTitle: z.string(),
  }),
  z.object({
    type: z.literal("load"),
    mediaId: MediaId.parser,
    mediaType: MediaType.parser,
    mediaTitle: z.string(),
  }),
]);
export type Route = z.infer<typeof Route>;
