import { cn } from "./cn";

export const TextField = ({
  label,
  class: className,
  error,
  ...input
}: JSX.HtmlInputTag & {
  label: string;
  error?: string;
}) => {
  return (
    <div class={cn("flex w-full flex-col gap-2", className)}>
      <label
        for="input"
        class="block text-left text-sm font-bold text-white peer-invalid:text-red-500"
        safe
      >
        {label}
      </label>

      <input
        {...input}
        aria-invalid={
          typeof error === "string" && error.trim().length > 0 ? "true" : " "
        }
        id="input"
        class="focus:shadow-outline peer w-full appearance-none rounded border-2 bg-neutral-800 p-4 text-xl leading-tight text-white shadow valid:border-transparent invalid:border-red-500 focus:border-blue-500 focus:outline-none invalid:focus:border-red-500"
      />
      <span class="invisible text-sm text-red-500 peer-invalid:visible">
        {error}
      </span>
    </div>
  );
};
