import { escape } from "src/core/html";
import type { Req } from "src/core/req";
import type { Res } from "src/core/res";
import { html, redirect } from "src/core/res";
import { isErr } from "src/core/result";
import { ROOT_SELECTOR } from "src/moviefinder-app/app/document";
import { TopBar } from "src/moviefinder-app/app/top-bar";
import type { Ctx } from "src/moviefinder-app/ctx";
import { encode } from "src/moviefinder-app/route";
import { AlertError } from "src/moviefinder-app/ui/alert";
import { Button } from "src/moviefinder-app/ui/button";
import { TextField } from "src/moviefinder-app/ui/text-field";
import { UserSessionId } from "src/moviefinder-app/user-session/user-session-id";
import type { User } from "src/moviefinder-app/user/user";
import { UserId } from "src/moviefinder-app/user/user-id";
import { Route } from "./route";
import { verifyCode } from "./verify-code";

export const respond = async (input: {
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
          t: "account",
          c: {
            t: "login",
            c: {
              t: "sms",
              c: {
                t: "verify-code",
                phone: phone,
              },
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

      const found = await input.ctx.userDb.findByPhone({
        phone: input.route.phone,
      });

      if (isErr(found)) {
        return html(
          <VerifyCode
            phone={input.route.phone}
            error="Errored while finding user"
          />,
        );
      }

      const user: User = found.value ?? {
        phone: input.route.phone,
        userId: UserId.generate(),
      };

      await input.ctx.userDb.put(user);

      await input.ctx.userSessionDb.put({
        sessionId: input.req.sessionId,
        userId: user.userId,
        userSessionId: UserSessionId.generate(),
      });

      return redirect(
        encode({
          t: "account",
          c: {
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
          c: {
            t: "account",
          },
        }}
      />
      <form
        class="flex h-full w-full flex-col items-center gap-6 p-4"
        hx-swap="innerHTML"
        hx-target={ROOT_SELECTOR}
        hx-push-url="true"
        data-loading-states
        hx-post={encode({
          t: "account",
          c: {
            t: "login",
            c: {
              t: "sms",
              c: {
                t: "clicked-send-code",
              },
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

        {input.error && <AlertError label={input.error} />}

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
          t: "account",
          c: {
            t: "login",
            c: {
              t: "sms",
              c: {
                t: "send-code",
              },
            },
          },
        }}
      />
      <form
        class="flex h-full w-full flex-col items-center gap-6 p-4 pt-8"
        hx-target={ROOT_SELECTOR}
        hx-push-url="true"
        hx-swap="innerHTML"
        data-loading-states
        hx-post={encode({
          t: "account",
          c: {
            t: "login",
            c: {
              t: "sms",
              c: {
                t: "clicked-verify-code",
                phone: input.phone,
              },
            },
          },
        })}
      >
        <p class="w-full text-left text-lg">
          Enter the code sent to <strong>{escape(input.phone)}</strong>
        </p>

        <TextField
          label="Code"
          type="tel"
          name="code"
          placeholder="Enter code"
          class="w-full"
          error={input.codeError}
        />

        {input.error && <AlertError label={input.error} />}

        <div class="w-full pt-3">
          <Button type="submit" class="w-full" label="Verify code" />
        </div>
      </form>
    </div>
  );
};
