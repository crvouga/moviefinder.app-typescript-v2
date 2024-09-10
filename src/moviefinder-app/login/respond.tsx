import type { Res } from "src/core/res";
import type { Ctx } from "../ctx";
import * as Sms from "./sms/respond";
import { Route } from "./route";
import type { Req } from "src/core/req";

export const respond = async (input: {
  req: Req;
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.t) {
    case "sms": {
      return Sms.respond({
        ...input,
        route: input.route.c,
      });
    }
  }
};
