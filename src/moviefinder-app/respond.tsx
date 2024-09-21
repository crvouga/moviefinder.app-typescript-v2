import type { Req } from "src/core/req";
import { redirect, type Res } from "src/core/res";
import * as Account from "./account/respond";
import type { Ctx } from "./ctx";
import * as Feed from "./feed/respond";
import * as Media from "./media/respond";
import { encode, type Route } from "./route";

export const respond = async (input: {
  req: Req;
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.t) {
    case "feed": {
      return Feed.respond({ ...input, route: input.route.c });
    }

    case "account": {
      return Account.respond({ ...input, route: input.route.c });
    }

    case "media": {
      return Media.respond({ ...input, route: input.route.c });
    }

    case "unknown": {
      return redirect(
        encode({
          t: "feed",
          c: {
            t: "index",
          },
        }),
      );
    }
  }
};
