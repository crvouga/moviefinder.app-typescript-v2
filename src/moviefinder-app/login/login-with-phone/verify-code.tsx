import type { CustomElement } from "../../element";
import { hx } from "../../hx";
import { html, redirect } from "../../response";
import { encode, Route } from "../../route/route";
import { Button } from "../../ui/button";
import { TextField } from "../../ui/text-field";

const RouteCodeVerified = Route("code-verified");

export const ViewCodeVerified: CustomElement = (attrs, content) => {
  return <p>Code verified</p>;
};

hx(RouteCodeVerified, async () => {
  console.log("code verified");

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return html(<ViewCodeVerified />);
});

const RouteVerifyCode = Route("verify-code");

hx(RouteVerifyCode, async (request) => {
  console.log("verify code");

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return redirect(RouteCodeVerified());
});

export const RouteVerifyCodeForm = Route("verify-code-form");

export const VerifyCodeForm: CustomElement = (attrs, content) => {
  return (
    <form
      class="w-full h-full flex flex-col items-center p-4 gap-4"
      hx-post={encode(RouteVerifyCode())}
      hx-swap="outerHTML"
    >
      <p>Enter the code sent to your phone number</p>
      <TextField
        label="Code"
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

hx(RouteVerifyCodeForm, () => {
  return html(<VerifyCodeForm />);
});
