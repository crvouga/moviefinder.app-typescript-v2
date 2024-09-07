import { cn } from "./cn";
import { Spinner } from "./spinner";

export const Button = ({
  label,
  ...input
}: JSX.HtmlButtonTag & HtmxAttributes & { label: string }) => {
  return (
    <button
      {...input}
      class={cn(
        "group relative flex items-center justify-center gap-2 rounded bg-blue-600 px-4 py-3 text-lg font-bold text-white hover:opacity-80 active:opacity-60",
        input.class,
      )}
      data-loading-aria-busy
      data-loading-disable
    >
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-aria-busy:opacity-100">
        <Spinner />
      </div>

      <div class="group-aria-busy:invisible">{label}</div>
    </button>
  );
};
