import { cn } from "./cn";

export const TextField = ({
  label,
  class: className,
  ...input
}: HtmxAttributes &
  JSX.HtmlInputTag & {
    label: string;
  }) => {
  return (
    <div class={cn("w-full", className)}>
      <label class="mb-2 block text-sm font-bold text-white">{label}</label>
      <input
        {...input}
        class="focus:shadow-outline w-full appearance-none rounded border-2 border-neutral-800 bg-neutral-800 p-4 px-5 py-4 text-xl leading-tight text-white shadow focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};
