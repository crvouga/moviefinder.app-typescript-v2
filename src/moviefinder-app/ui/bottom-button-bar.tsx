import type { Children } from "@kitajs/html";
import { cn } from "./cn";
import { Spinner } from "./spinner";

export const BottomButtonBar = (input: {
  buttons: {
    text: Children;
    icon: Children;
    hxGet: string;
    hxTarget: string;
    active: boolean;
  }[];
}) => {
  return (
    <div class="flex w-full items-center divide-x border-t" data-loading-states>
      {input.buttons.map((button) => (
        <a
          hx-get={button.hxGet}
          hx-target={button.hxTarget}
          hx-push-url="true"
          class={cn(
            "relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 py-3 text-xs",
            button.active ? "text-blue-500" : "",
          )}
          data-loading-aria-busy
          data-loading-disable
        >
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-aria-busy:opacity-100">
            <Spinner class="size-8" />
          </div>
          <div class="relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 py-3 text-xs">
            {button.icon}
            {button.text}
          </div>
        </a>
      ))}
    </div>
  );
};
