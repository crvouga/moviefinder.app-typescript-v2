import { z } from "zod";
import { MediaId } from "../media-id";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("clicked-seen"),
    mediaId: MediaId.parser,
  }),
  z.object({
    t: z.literal("clicked-not-seen"),
    mediaId: MediaId.parser,
  }),
  z.object({
    t: z.literal("clicked-liked"),
    mediaId: MediaId.parser,
  }),
  z.object({
    t: z.literal("clicked-disliked"),
    mediaId: MediaId.parser,
  }),
  z.object({
    t: z.literal("clicked-interested"),
    mediaId: MediaId.parser,
  }),
  z.object({
    t: z.literal("clicked-not-interested"),
    mediaId: MediaId.parser,
  }),
]);
