import type { CustomElement } from "../../shared/element";
import { hx } from "../../shared/hx";
import { html, redirect } from "../../shared/res";
import { encode, Route } from "../../shared/route/route";
import { Button } from "../../shared/ui/button";
import { TextField } from "../../shared/ui/text-field";
import { RouteVerifyCodeForm } from "./verify-code";

const RouteSendCode = Route("send-code");

hx(RouteSendCode, async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return redirect(RouteVerifyCodeForm());
});

export const RouteSendCodeForm = Route("send-code-form");

export const SendCodeForm: CustomElement = (attrs, content) => {
  return (
    <form
      class="w-full h-full flex flex-col items-center p-4 gap-4"
      hx-post={encode(RouteSendCode())}
      hx-swap="outerHTML"
    >
      <TextField
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="Enter your phone number"
        required
        class="w-full"
      />

      <div class="w-full pt-3">
        <Button class="w-full" label="Send code" />
      </div>
    </form>
  );
};

hx(RouteSendCodeForm, () => {
  return html(<SendCodeForm />);
});
