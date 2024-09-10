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
import { isErr } from "src/core/result";
import { verifyCode } from "./verify-code";

export const routeHx = async (input: {
  req: Req;
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.t) {
    case "send-code": {
      return html(<SendCodeForm />);
    }

    case "clicked-send-code": {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const phone = input.req.formData["phone"];

      if (typeof phone !== "string" || phone.trim().length === 0) {
        return html(<SendCodeForm phoneError="Invalid phone number" />);
      }

      const sentCode = await input.ctx.verifySms.sendCode({
        phone,
      });

      if (isErr(sentCode)) {
        switch (sentCode.error.t) {
          case "unknown": {
            return html(<SendCodeForm error={sentCode.error.message} />);
          }
        }
      }

      return redirect(
        encode({
          t: "login",
          child: {
            t: "login-with-phone",
            child: {
              t: "verify-code",
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
      const code = input.req.formData["code"];

      if (typeof code !== "string" || code.trim().length === 0) {
        return html(
          <VerifyCode phone={input.route.phone} codeError="Invalid code" />,
        );
      }

      const verifiedCode = await verifyCode({
        code,
        ctx: input.ctx,
        phone: input.route.phone,
        sessionId: input.req.sessionId,
      });

      if (isErr(verifiedCode)) {
        switch (verifiedCode.error.t) {
          case "unknown": {
            return html(
              <VerifyCode
                phone={input.route.phone}
                error={verifiedCode.error.message}
              />,
            );
          }

          case "wrong-code": {
            return html(
              <VerifyCode phone={input.route.phone} codeError="Wrong code" />,
            );
          }
        }
      }

      return redirect(
        encode({
          t: "account",
          child: {
            t: "account",
          },
        }),
      );
    }
  }
};

const SendCodeForm = (input: { phoneError?: string; error?: string }) => {
  return (
    <div class="flex h-full w-full flex-1 flex-col">
      <TopBar
        title="Login with phone"
        backRoute={{
          t: "account",
          child: {
            t: "account",
          },
        }}
      />
      <form
        class="flex h-full w-full flex-col items-center gap-4 p-4"
        hx-swap="innerHTML"
        hx-target={ROOT_SELECTOR}
        hx-push-url="true"
        data-loading-states
        hx-post={encode({
          t: "login",
          child: {
            t: "login-with-phone",
            child: {
              t: "clicked-send-code",
            },
          },
        })}
      >
        <TextField
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          class="w-full"
          error={input.phoneError}
        />

        {input.error && <div>Error: {input.error}</div>}

        <div class="w-full pt-3">
          <Button type="submit" class="w-full" label="Send code" />
        </div>
      </form>
    </div>
  );
};

const VerifyCode = (input: {
  phone: string;
  codeError?: string;
  error?: string;
}) => {
  return (
    <div class="flex h-full w-full flex-1 flex-col">
      <TopBar
        title="Login with phone"
        backRoute={{
          t: "login",
          child: {
            t: "login-with-phone",
            child: {
              t: "send-code",
            },
          },
        }}
      />
      <form
        class="flex h-full w-full flex-col items-center gap-4 p-4"
        hx-target={ROOT_SELECTOR}
        hx-push-url="true"
        hx-swap="innerHTML"
        data-loading-states
        hx-post={encode({
          t: "login",
          child: {
            t: "login-with-phone",
            child: {
              t: "clicked-verify-code",
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
          class="w-full"
          error={input.codeError}
        />

        {input.error && <div>Error: {input.error}</div>}

        <div class="w-full pt-3">
          <Button type="submit" class="w-full" label="Verify code" />
        </div>
      </form>
    </div>
  );
};
