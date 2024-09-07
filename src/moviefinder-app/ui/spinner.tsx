import { cn } from "./cn";
import { IconSpinner } from "./icon";

export const Spinner = (input: { class?: string }) => {
  return <IconSpinner class={cn(input.class, "size-8 animate-spin")} />;
};
