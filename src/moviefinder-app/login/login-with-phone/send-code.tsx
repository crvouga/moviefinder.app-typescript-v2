import { Button } from "../../ui/button";
import { TextField } from "../../ui/text-field";

export const SendCodeForm = () => {
  return (
    <form
      class="w-full h-full flex flex-col items-center p-4 gap-4"
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
