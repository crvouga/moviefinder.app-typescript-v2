import { type Res } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
import * as Details from "./details/respond";
import type { Route } from "./route";

export const respond = async (input: {
  ctx: Ctx;
  route: Route;
}): Promise<Res> => {
  switch (input.route.t) {
    case "details": {
      return Details.respond({
        ...input,
        route: input.route.c,
      });
    }
  }
};
