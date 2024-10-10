import type { Req } from "src/core/req";
import type { Res } from "src/core/res";
import { redirect } from "src/core/res";
import { unwrap } from "src/core/result";
import type { Ctx } from "src/moviefinder-app/ctx";
import { ROOT_SELECTOR } from "../../app/document";
import { encode } from "../../route";
import { Button } from "../../ui/button";
import type { Route } from "./route";

export const respond = async (input: {
  route: Route;
  ctx: Ctx;
  req: Req;
}): Promise<Res> => {
  switch (input.route.t) {
    case "clicked-logout": {
      const maybeUserSession = unwrap(
        await input.ctx.userSessionDb.findBySessionId(input.req.sessionId),
        null,
      );
      if (maybeUserSession?.userSessionId) {
        await input.ctx.userSessionDb.zap(maybeUserSession.userSessionId);
      }
      return redirect(encode({ t: "account", c: { t: "index" } }));
    }
  }
};

export const ViewLogoutButton = () => {
  return (
    <Button
      label="Login"
      hx-swap="innerHTML"
      hx-target={ROOT_SELECTOR}
      hx-push-url="true"
      hx-get={encode({
        t: "account",
        c: {
          t: "login",
          c: { t: "sms", c: { t: "send-code" } },
        },
      })}
    />
  );
};
