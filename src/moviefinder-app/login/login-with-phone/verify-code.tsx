import type { CustomElement } from "../../shared/element";
import { hx } from "../../hx";
import { html, redirect } from "../../shared/res";
import { encode, Route } from "../../shared/route/route";
import { Button } from "../../shared/ui/button";
import { TextField } from "../../shared/ui/text-field";

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
      <p class="w-full text-left">Enter the code sent to your phone number</p>

      <TextField
        label="Code"
        type="tel"
        name="phone"
        placeholder="Enter the code"
        required
        class="w-full"
      />

      <div class="w-full pt-3">
        <Button class="w-full" label="Verify code" />
      </div>
    </form>
  );
};

hx(RouteVerifyCodeForm, () => {
  return html(<VerifyCodeForm />);
});
