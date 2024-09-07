import type { Res } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
import { Route } from "./route";
import * as SendCode from "./send-code/router";
import * as VerifyCode from "./verify-code/router";

export const routeHx = async (input: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.type) {
    case "send-code": {
      return SendCode.routeHx();
    }

    case "verify-code": {
      return VerifyCode.routeHx();
    }
  }
};
