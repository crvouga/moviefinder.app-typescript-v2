import {
  IconCheckmark,
  IconEye,
  IconEyeSlash,
  IconHandThumbsDown,
  IconHandThumbsUp,
  IconXMark,
} from "src/moviefinder-app/ui/icon";
import { z } from "zod";

const parser = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("seen"),
  }),
  z.object({
    t: z.literal("not-seen"),
  }),
  z.object({
    t: z.literal("liked"),
  }),
  z.object({
    t: z.literal("disliked"),
  }),
  z.object({
    t: z.literal("interested"),
  }),
  z.object({
    t: z.literal("uninterested"),
  }),
]);

export type FeedbackType = z.infer<typeof parser>;

export const toDisplayString = (input: FeedbackType): string => {
  switch (input.t) {
    case "seen": {
      return "Seen";
    }
    case "not-seen": {
      return "Not Seen";
    }
    case "liked": {
      return "Liked";
    }
    case "disliked": {
      return "Disliked";
    }
    case "interested": {
      return "Interested";
    }
    case "uninterested": {
      return "Uninterested";
    }
  }
};

export const Icon = (input: { feedbackType: FeedbackType; class?: string }) => {
  const className = input.class ?? "h-8 w-8";
  switch (input.feedbackType.t) {
    case "disliked": {
      return <IconHandThumbsDown class={className} />;
    }
    case "interested": {
      return <IconCheckmark class={className} />;
    }
    case "liked": {
      return <IconHandThumbsUp class={className} />;
    }
    case "uninterested": {
      return <IconXMark class={className} />;
    }
    case "not-seen": {
      return <IconEyeSlash class={className} />;
    }
    case "seen": {
      return <IconEye class={className} />;
    }
  }
};

const ORDER: FeedbackType[] = [
  {
    t: "seen",
  },
  {
    t: "not-seen",
  },
  {
    t: "liked",
  },
  {
    t: "disliked",
  },
  {
    t: "interested",
  },
  {
    t: "uninterested",
  },
];

export const FeedbackType = {
  parser,
  Icon,
  toDisplayString,
  ORDER,
};
