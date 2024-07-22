import type { CustomElement } from "../element";

export const IconButton: CustomElement = (attrs, content) => {
  return (
    <button class="p-4 flex items-center justify-center" {...attrs}>
      {content}
    </button>
  );
};
