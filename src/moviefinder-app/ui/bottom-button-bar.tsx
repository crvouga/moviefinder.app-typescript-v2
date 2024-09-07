import { cn } from "./cn";

export const BottomButtonBar = (props: {
  buttons: {
    text: string;
    hxGet: string;
    hxTarget: string;
    active: boolean;
  }[];
}) => {
  return (
    <div class="flex w-full items-center divide-x border-t">
      {props.buttons.map((button) => (
        <a
          key={button.text}
          hx-get={button.hxGet}
          hx-target={button.hxTarget}
          hx-push-url="true"
          class={cn(
            "flex flex-1 cursor-pointer flex-col items-center justify-center p-4",
            button.active ? "text-blue-500" : "",
          )}
        >
          {button.text}
        </a>
      ))}
    </div>
  );
};
