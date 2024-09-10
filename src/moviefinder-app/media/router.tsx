import { type Res } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
import * as Details from "./details/router";
import type { Route } from "./route";

export const routeHx = async (input: {
  ctx: Ctx;
  route: Route;
}): Promise<Res> => {
  switch (input.route.t) {
    case "details": {
      return Details.routeHx({
        ...input,
        route: input.route.child,
      });
    }
  }
};
