import type { CustomElement } from "../element";

export const TextField: CustomElement = (attrs, _content) => {
  return (
    <div class="w-full">
      <label class="block text-sm font-bold mb-2 text-white">
        {attrs.label}
      </label>
      <input
        {...attrs}
        class="text-lg shadow appearance-none border rounded w-full py-4 px-5 text-white bg-neutral-700 border-neutral-800 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
      />
    </div>
  );
};
