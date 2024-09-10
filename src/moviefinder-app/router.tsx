import type { Req } from "src/core/req";
import { redirect, type Res } from "src/core/res";
import * as Account from "./account/router";
import type { Ctx } from "./ctx";
import * as Feed from "./feed/router";
import * as Login from "./login/router";
import * as Media from "./media/router";
import { encode, type Route } from "./route";

export const routeHx = async (input: {
  req: Req;
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.t) {
    case "feed": {
      return Feed.routeHx({ ...input, route: input.route.c });
    }

    case "account": {
      return Account.routeHx({ ...input, route: input.route.c });
    }

    case "login": {
      return Login.routeHx({ ...input, route: input.route.c });
    }

    case "media": {
      return Media.routeHx({ ...input, route: input.route.c });
    }

    case "unknown": {
      return redirect(
        encode({
          t: "feed",
          c: {
            t: "feed",
            feedId: null,
          },
        }),
      );
    }
  }
};
