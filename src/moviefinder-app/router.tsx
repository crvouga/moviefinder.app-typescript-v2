import type { Ctx } from "./ctx";
import * as FeedRouter from "./feed/router";
import type { Res } from "./res";
import type { Route } from "./route";

export const routeHx = async (input: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.type) {
    case "feed": {
      return FeedRouter.routeHx({ ...input, route: input.route.child });
    }
  }
};
