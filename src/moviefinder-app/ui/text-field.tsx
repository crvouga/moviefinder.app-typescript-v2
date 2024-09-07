import { cn } from "./cn";

export const TextField = ({
  label,
  class: className,
  error,
  ...input
}: HtmxAttributes &
  JSX.HtmlInputTag & {
    label: string;
    error?: string;
  }) => {
  return (
    <div class={cn("flex w-full flex-col gap-2", className)}>
      <label
        for="input"
        class="block text-sm font-bold text-white peer-invalid:text-red-500"
      >
        {label}
      </label>
      <input
        {...input}
        aria-invalid={error ? "true" : "false"}
        id="input"
        class="focus:shadow-outline peer w-full appearance-none rounded border-2 border-neutral-800 bg-neutral-800 p-4 px-5 py-4 text-xl leading-tight text-white shadow invalid:border-red-500 focus:border-blue-500 focus:outline-none invalid:focus:border-red-500"
      />
      <span class="hidden text-sm text-red-500 peer-invalid:block">
        {error}
      </span>
    </div>
  );
};
