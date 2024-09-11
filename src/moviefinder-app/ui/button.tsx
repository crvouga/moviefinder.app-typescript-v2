import type { PropsWithChildren } from "@kitajs/html";
import { cn } from "./cn";
import { Spinner } from "./spinner";

export const Button = ({
  label,
  ...props
}: PropsWithChildren<
  { label: string; class?: string } & JSX.HtmlButtonTag
>) => {
  return (
    <button
      {...props}
      class={cn(
        "group relative flex items-center justify-center gap-2 rounded bg-blue-600 px-4 py-3 text-lg font-bold text-white hover:opacity-80 active:opacity-60",
        props.class,
      )}
      data-loading-aria-busy
      data-loading-disable
    >
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-aria-busy:opacity-100">
        <Spinner class="size-8" />
      </div>

      <div class="group-aria-busy:invisible" safe>
        {label}
      </div>
    </button>
  );
};
