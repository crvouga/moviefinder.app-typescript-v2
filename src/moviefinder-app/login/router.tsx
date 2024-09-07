import type { Res } from "src/core/res";
import type { Ctx } from "../ctx";
import * as LoginWithPhone from "./login-with-phone/router";
import { Route } from "./route";

export const routeHx = async (input: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.type) {
    case "login-with-phone": {
      return LoginWithPhone.routeHx({
        ...input,
        route: input.route.child,
      });
    }
  }
};
