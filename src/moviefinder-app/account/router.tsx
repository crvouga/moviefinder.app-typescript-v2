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

const Layout = (input: { children: string }) => {
  return (
    <div class="flex h-full w-full flex-col">
      <div class="flex w-full flex-1 flex-col">{input.children}</div>
      <AppBottomButtonBar active="account" />
    </div>
  );
};

export const AccountPage = () => {
  return <Layout children={<div>Account</div>} />;
};
