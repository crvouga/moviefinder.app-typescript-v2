import { cn } from "./cn";

export const Button = ({
  label,
  ...input
}: HtmxAttributes & { label: string }) => {
  return (
    <button
      {...input}
      class={cn(
        "rounded bg-blue-600 px-4 py-3 text-lg font-bold text-white hover:opacity-80 active:opacity-60",
      )}
    >
      {label}
    </button>
  );
};
