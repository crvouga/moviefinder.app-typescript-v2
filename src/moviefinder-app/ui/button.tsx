import type { CustomElementHandler } from "typed-html";

import { cn } from "./cn";

export const Button: CustomElementHandler = (attrs, _content) => {
  return (
    <button
      {...attrs}
      class={cn(
        "px-2 py-3 text-lg font-bold bg-blue-600 rounded text-white hover:opacity-80 active:opacity-60"
      )}
    >
      {attrs.label}
    </button>
  );
};
