import type { Children } from "src/core/html";
import { cn } from "./cn";

export const BottomButtonBar = (input: {
  buttons: JSX.HtmlButtonTag &
    {
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
        <button
          hx-get={button.hxGet}
          hx-target={button.hxTarget}
          hx-push-url="true"
          class={cn(
            "group relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 py-3 text-xs",
            button.active ? "text-blue-500" : "",
          )}
        >
          {button.icon}
          {button.text}
        </button>
      ))}
    </div>
  );
};
