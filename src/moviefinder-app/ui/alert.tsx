import { escape } from "src/core/html";

export const AlertError = (input: { label: string }) => {
  return (
    <div
      class="relative flex w-full items-center justify-start rounded border border-red-400 bg-red-800 px-4 py-3 text-white"
      role="alert"
    >
      {escape(input.label)}
    </div>
  );
};
