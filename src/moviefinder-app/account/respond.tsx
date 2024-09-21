import type { Children } from "src/core/html";
import type { Req } from "src/core/req";
import type { Res } from "src/core/res";
import { html } from "src/core/res";
import * as Login from "./login/respond";
import { isErr } from "src/core/result";
import type { Ctx } from "src/moviefinder-app/ctx";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import { ROOT_SELECTOR } from "../app/document";
import { encode } from "../route";
import { Button } from "../ui/button";
import { IconDoorOpen } from "../ui/icon";
import type { User } from "../user/user";
import type { Route } from "./route";

export const respond = async (input: {
  route: Route;
  ctx: Ctx;
  req: Req;
}): Promise<Res> => {
  switch (input.route.t) {
    case "login": {
      return Login.respond({
        route: input.route.c,
        ctx: input.ctx,
        req: input.req,
      });
    }
    case "account": {
      const found = await input.ctx.userSessionDb.findBySessionId(
        input.req.sessionId,
      );
      if (isErr(found)) {
        return html(<ViewError error={found.error} />);
      }

      const userSession = found.value;

      if (!userSession) {
        return html(<ViewLoggedOut />);
      }

      const foundUser = await input.ctx.userDb.get(userSession.userId);

      if (isErr(foundUser)) {
        return html(<ViewError error={foundUser.error} />);
      }

      const user = foundUser.value;

      if (!user) {
        return html(<ViewLoggedOut />);
      }

      return html(<ViewLoggedIn user={user} />);
    }
  }
};

const ViewLayout = (input: { children: Children }) => {
  return (
    <div class="flex h-full w-full flex-col">
      <div class="flex w-full flex-1 flex-col">{input.children}</div>
      <AppBottomButtonBar active="account" />
    </div>
  );
};

const ViewError = (input: { error: string }) => {
  return <div>{input.error}</div>;
};

export const ViewLoggedOut = () => {
  return (
    <ViewLayout>
      <div
        class="flex h-full w-full flex-col items-center justify-center gap-4"
        data-loading-states
      >
        <IconDoorOpen class="size-24" />
        <p class="text-center text-xl font-bold">
          Login to access your account.
        </p>

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
      </div>
    </ViewLayout>
  );
};

export const ViewLoggedIn = (input: { user: User }) => {
  return (
    <ViewLayout>
      <div
        class="flex h-full w-full flex-col items-center justify-center gap-4"
        data-loading-states
      >
        <p class="text-center text-xl font-bold">Logged in.</p>

        <Button label="Logout" />
      </div>
    </ViewLayout>
  );
};
