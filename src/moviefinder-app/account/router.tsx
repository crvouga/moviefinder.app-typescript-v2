import type { Res } from "src/core/res";
import { html } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import type { Route } from "./route";

export const routeHx = async ({
  route,
  ctx,
}: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (route.type) {
    case "account": {
      return html(<AccountPage />);
    }
    case "account.load": {
      return html(<AccountPage />);
    }
  }
};

export const AccountPage = () => {
  return (
    <div class="flex h-full w-full flex-col">
      <div class="w-full flex-1"></div>
      <AppBottomButtonBar active="account" />
    </div>
  );
};
