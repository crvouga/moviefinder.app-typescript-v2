import * as elements from "typed-html";

export const IconButton: elements.CustomElementHandler = (attrs, content) => {
  return (
    <button class="p-4 flex items-center justify-center" {...attrs}>
      {content}
    </button>
  );
};
