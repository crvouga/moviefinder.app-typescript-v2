import type { Req } from "src/core/req";
import type { Res } from "src/core/res";
import { html, redirect } from "src/core/res";
import { ROOT_SELECTOR } from "src/moviefinder-app/app/document";
import { TopBar } from "src/moviefinder-app/app/top-bar";
import type { Ctx } from "src/moviefinder-app/ctx";
import { encode } from "src/moviefinder-app/route";
import { Button } from "../../ui/button";
import { TextField } from "../../ui/text-field";
import { Route } from "./route";

export const routeHx = async (input: {
  req: Req;
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.type) {
    case "send-code": {
      return html(<SendCodeForm />);
    }

    case "clicked-send-code": {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const phone = input.req.formData["phone"];

      if (typeof phone !== "string") {
        return html(<SendCodeForm />);
      }

      return redirect(
        encode({
          type: "login",
          child: {
            type: "login-with-phone",
            child: {
              type: "verify-code",
              phoneNumber: phone,
            },
          },
        }),
      );
    }

    case "verify-code": {
      return html(<VerifyCode />);
    }
  }
};

const SendCodeForm = (input?: { phoneNumberError?: string }) => {
  return (
    <div class="flex h-full w-full flex-1 flex-col">
      <TopBar
        title="Login with phone"
        backRoute={{
          type: "account",
          child: {
            type: "account",
          },
        }}
      />
      <form
        class="flex h-full w-full flex-col items-center gap-4 p-4"
        hx-swap="innerHTML"
        hx-target={ROOT_SELECTOR}
        hx-push-url="true"
        hx-post={encode({
          type: "login",
          child: {
            type: "login-with-phone",
            child: {
              type: "clicked-send-code",
            },
          },
        })}
      >
        <TextField
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          required="true"
          class="w-full"
        />

        <div class="w-full pt-3">
          <Button type="submit" class="w-full" label="Send code" />
        </div>
      </form>
    </div>
  );
};

const VerifyCode = () => {
  return (
    <div class="flex h-full w-full flex-1 flex-col">
      <TopBar
        title="Login with phone"
        backRoute={{
          type: "login",
          child: {
            type: "login-with-phone",
            child: {
              type: "send-code",
            },
          },
        }}
      />
      <form class="flex h-full w-full flex-col items-center gap-4 p-4">
        <TextField
          label="code"
          type="tel"
          name="code"
          placeholder="Enter code"
          required="true"
          class="w-full"
        />

        <div class="w-full pt-3">
          <Button type="submit" class="w-full" label="Verify code" />
        </div>
      </form>
    </div>
  );
};
