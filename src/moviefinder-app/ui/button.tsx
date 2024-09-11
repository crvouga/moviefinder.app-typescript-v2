import { escape } from "src/core/html";
import { cn } from "./cn";
import { Spinner } from "./spinner";

type Props = JSX.HtmlButtonTag & { label: string; class?: string };

export const Button = ({ label, ...props }: Props) => {
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

      <div class="group-aria-busy:invisible">{escape(label)}</div>
    </button>
  );
};
