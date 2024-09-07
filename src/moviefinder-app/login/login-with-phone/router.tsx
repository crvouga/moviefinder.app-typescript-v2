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

      if (typeof phone !== "string" || phone.trim().length === 0) {
        return html(<SendCodeForm phoneError="Phone number is required" />);
      }

      return redirect(
        encode({
          type: "login",
          child: {
            type: "login-with-phone",
            child: {
              type: "verify-code",
              phone: phone,
            },
          },
        }),
      );
    }

    case "verify-code": {
      return html(<VerifyCode phone={input.route.phone} />);
    }

    case "clicked-verify-code": {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const code = input.req.formData["code"];

      if (typeof code !== "string" || code.trim().length === 0) {
        return html(<VerifyCode phone={input.route.phone} />);
      }

      return redirect(
        encode({
          type: "account",
          child: {
            type: "account",
          },
        }),
      );
    }
  }
};

const SendCodeForm = (input: { phoneError?: string }) => {
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
          // required="true"
          class="w-full"
          error={input.phoneError}
        />

        <div class="w-full pt-3">
          <Button type="submit" class="w-full" label="Send code" />
        </div>
      </form>
    </div>
  );
};

const VerifyCode = (input: { phone: string }) => {
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
      <form
        class="flex h-full w-full flex-col items-center gap-4 p-4"
        hx-target={ROOT_SELECTOR}
        hx-push-url="true"
        hx-swap="innerHTML"
        hx-post={encode({
          type: "login",
          child: {
            type: "login-with-phone",
            child: {
              type: "clicked-verify-code",
              phone: input.phone,
            },
          },
        })}
      >
        <p class="w-full text-left text-lg">
          Enter the code sent to <strong>{input.phone}</strong>
        </p>
        <TextField
          label="Code"
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
