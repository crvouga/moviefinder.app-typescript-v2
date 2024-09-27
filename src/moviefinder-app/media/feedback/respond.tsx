import type { Req } from "src/core/req";
import { empty, type Res } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
import { IconButton } from "src/moviefinder-app/ui/icon-button";
import { FeedbackType } from "./feedback-type";
import type { Route } from "./route";

export const respond = async (input: {
  req: Req;
  ctx: Ctx;
  route: Route;
}): Promise<Res> => {
  switch (input.route.t) {
    case "toggled-feedback": {
      return empty();
    }
  }
};

export const ViewMediaFeedbackForm = (input: {}) => {
  return (
    <div class="absolute bottom-2 right-2">
      {FeedbackType.ORDER.map((feedbackType) => (
        <IconButton
          label={FeedbackType.toDisplayString(feedbackType)}
          // hx-post={encode({
          //   t: "media",
          //   c: {
          //     t: "feedback",
          //     c: {
          //       t: "toggled",
          //       feedbackType: feedbackType,
          //     },
          //   },
          // })}
        >
          <FeedbackType.Icon feedbackType={feedbackType} class="h-8 w-8" />
        </IconButton>
      ))}
    </div>
  );
};
