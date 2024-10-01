import type { Children } from "src/core/html";
import type { Req } from "src/core/req";
import type { Res } from "src/core/res";
import { html } from "src/core/res";
import { isErr } from "src/core/result";
import type { Ctx } from "src/moviefinder-app/ctx";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import { ViewErrorPage } from "../ui/error-page";
import type { User } from "../user/user";
import * as Login from "./login/respond";
import * as Logout from "./logout/respond";
import type { Route } from "./route";

export const respond = async (input: {
  route: Route;
  ctx: Ctx;
  req: Req;
}): Promise<Res> => {
  switch (input.route.t) {
    case "login": {
      return Login.respond({ ...input, route: input.route.c });
    }

    case "logout": {
      return Logout.respond({ ...input, route: input.route.c });
    }

    case "index": {
      const found = await input.ctx.userSessionDb.findBySessionId(
        input.req.sessionId,
      );

      if (isErr(found)) {
        return html(<ViewErrorPage error={found.error} />);
      }

      const userSession = found.value;

      if (!userSession) {
        return html(<ViewLoggedOut />);
      }

      const foundUser = await input.ctx.userDb.get(userSession.userId);

      if (isErr(foundUser)) {
        return html(<ViewErrorPage error={foundUser.error} />);
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

export const ViewLoggedOut = () => {
  return (
    <ViewLayout>
      <Login.ViewLoginCTA />
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
        <p class="text-center text-xl font-bold">Logged in</p>

        <Logout.ViewLogoutButton />
      </div>
    </ViewLayout>
  );
};
