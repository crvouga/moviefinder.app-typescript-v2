import { z } from "zod";
import { MediaId } from "../media-id";
import { MediaType } from "../media-type";
import { FeedbackType } from "./feedback-type";

export const Route = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("toggled-feedback"),
    feedbackType: FeedbackType.parser,
    mediaId: MediaId.parser,
    mediaType: MediaType.parser,
  }),
]);

export type Route = z.infer<typeof Route>;
