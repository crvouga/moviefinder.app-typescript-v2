import type { CustomElement } from "../element";
import { cn } from "./cn";

export const Button: CustomElement<{ label: string; class?: string }> = (
  attrs,
  _content
) => {
  return (
    <button
      {...attrs}
      class={cn(
        "px-2 py-3 text-lg font-bold bg-blue-600 rounded text-white hover:opacity-80 active:opacity-60",
        attrs.class
      )}
    >
      {attrs.label}
    </button>
  );
};
