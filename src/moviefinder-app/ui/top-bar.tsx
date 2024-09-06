import { IconButton } from "./icon-button";
import { IconArrowLeft } from "./icon/icon-arrow-left";

export const TopBar = (props: { title: string; backRoute: string }) => {
  return (
    <div class="w-full border-b border-neutral-700 h-16 flex items-center justify-center">
      <div class="flex-1">
        <IconButton hx-get="/" hx-push-url="true" hx-target="#root">
          <IconArrowLeft />
        </IconButton>
      </div>

      <p class="text-lg font-bold flex-3">{props.title}</p>
      <div class="flex-1"></div>
    </div>
  );
};
