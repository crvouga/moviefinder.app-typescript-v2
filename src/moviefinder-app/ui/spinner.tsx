import { cn } from "./cn";
import { IconSpinner } from "./icon";

export const Spinner = (input: { class?: string }) => {
  return <IconSpinner class={cn("size-12 animate-spin", input.class)} />;
};
