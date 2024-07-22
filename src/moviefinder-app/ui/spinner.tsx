import type { CustomElementHandler } from "typed-html";
import { IconSpinner } from "./icon/icon-spinner";

export const Spinner: CustomElementHandler = () => {
  return (
    <div class="animate-spin">
      <IconSpinner />
    </div>
  );
};
