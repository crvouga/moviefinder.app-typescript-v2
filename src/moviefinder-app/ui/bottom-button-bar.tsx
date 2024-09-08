import { cn } from "./cn";

export const BottomButtonBar = (props: {
  buttons: {
    text: string;
    icon: string;
    hxGet: string;
    hxTarget: string;
    active: boolean;
  }[];
}) => {
  return (
    <div class="flex w-full items-center divide-x border-t" data-loading-states>
      {props.buttons.map((button) => (
        <a
          key={button.text}
          hx-get={button.hxGet}
          hx-target={button.hxTarget}
          hx-push-url="true"
          class={cn(
            "flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 py-3 text-xs",
            button.active ? "text-blue-500" : "",
          )}
        >
          {button.icon}
          {button.text}
        </a>
      ))}
    </div>
  );
};
