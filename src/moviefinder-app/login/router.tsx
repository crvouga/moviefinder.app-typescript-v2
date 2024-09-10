import type { Res } from "src/core/res";
import type { Ctx } from "../ctx";
import * as LoginWithPhone from "./login-with-phone/router";
import { Route } from "./route";
import type { Req } from "src/core/req";

export const routeHx = async (input: {
  req: Req;
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.t) {
    case "login-with-phone": {
      return LoginWithPhone.routeHx({
        ...input,
        route: input.route.child,
      });
    }
  }
};
