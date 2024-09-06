import * as elements from "typed-html";
import { IconSpinner } from "./icon/icon-spinner";

export const Spinner: elements.CustomElementHandler = () => {
  return (
    <div class="animate-spin">
      <IconSpinner />
    </div>
  );
};
