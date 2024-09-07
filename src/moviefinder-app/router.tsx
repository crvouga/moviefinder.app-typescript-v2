import { redirect, type Res } from "src/core/res";
import type { Ctx } from "./ctx";
import * as Feed from "./feed/router";
import * as Account from "./account/router";
import { encode, type Route } from "./route";

export const routeHx = async (input: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.type) {
    case "feed": {
      return Feed.routeHx({ ...input, route: input.route.child });
    }
    case "account": {
      return Account.routeHx({ ...input, route: input.route.child });
    }
    case "unknown": {
      return redirect(
        encode({
          type: "feed",
          child: {
            type: "feed",
          },
        }),
      );
    }
  }
};
