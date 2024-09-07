import type { Res } from "src/core/res";
import { html } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import { ROOT_SELECTOR } from "../app/document";
import { encode } from "../route";
import { Button } from "../ui/button";
import { IconDoorOpen } from "../ui/icon";
import type { Route } from "./route";

export const routeHx = async (input: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.type) {
    case "account": {
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
  return (
    <Layout
      children={
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
              type: "login",
              child: {
                type: "login-with-phone",
                child: {
                  type: "send-code",
                },
              },
            })}
          />
        </div>
      }
    />
  );
};
