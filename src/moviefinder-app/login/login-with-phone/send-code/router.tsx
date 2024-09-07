import { html } from "src/core/res";
import { Button } from "../../../ui/button";
import { TextField } from "../../../ui/text-field";

export const routeHx = async () => {
  return html(<SendCodeForm />);
};

const SendCodeForm = () => {
  return (
    <form
      class="flex h-full w-full flex-col items-center gap-4 p-4"
      hx-post="/"
      hx-swap="outerHTML"
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
        <Button class="w-full" label="Send code" />
      </div>
    </form>
  );
};
