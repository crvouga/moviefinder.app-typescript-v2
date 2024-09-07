import type { CustomElementHandler } from "typed-html";
import { Button } from "../../ui/button";
import { TextField } from "../../ui/text-field";

export const ViewCodeVerified: CustomElementHandler = (attrs, content) => {
  return <p>Code verified</p>;
};

export const VerifyCodeForm: CustomElementHandler = (attrs, content) => {
  return (
    <form
      class="flex h-full w-full flex-col items-center gap-4 p-4"
      hx-post="/"
      hx-swap="outerHTML"
    >
      <p class="w-full text-left">Enter the code sent to your phone number</p>

      <TextField
        label="Code"
        type="tel"
        name="phone"
        placeholder="Enter the code"
        required="true"
        class="w-full"
      />

      <div class="w-full pt-3">
        <Button class="w-full" label="Verify code" />
      </div>
    </form>
  );
};
