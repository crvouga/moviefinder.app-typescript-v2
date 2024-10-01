import type { Req } from "src/core/req";
import type { Res } from "src/core/res";
import { ROOT_SELECTOR } from "src/moviefinder-app/app/document";
import { encode } from "src/moviefinder-app/route";
import { Button } from "src/moviefinder-app/ui/button";
import { IconDoorOpen } from "src/moviefinder-app/ui/icon";
import type { Ctx } from "../../ctx";
import { Route } from "./route";
import * as Sms from "./sms/respond";

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

export const ViewLoginCTA = () => {
  return (
    <div
      class="flex h-full w-full flex-col items-center justify-center gap-4"
      data-loading-states
    >
      <IconDoorOpen class="size-24" />

      <p class="text-center text-xl font-bold">Login to access your account.</p>

      <Button
        label="Login"
        hx-swap="innerHTML"
        hx-target={ROOT_SELECTOR}
        hx-push-url="true"
        hx-get={encode({
          t: "account",
          c: { t: "login", c: { t: "sms", c: { t: "send-code" } } },
        })}
      />
    </div>
  );
};
