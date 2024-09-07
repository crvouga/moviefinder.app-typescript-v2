import { IconButton } from "./icon-button";
import { IconArrowLeft } from "./icon/icon-arrow-left";

export const TopBar = (props: { title: string; backRoute: string }) => {
  return (
    <div class="flex h-16 w-full items-center justify-center border-b border-neutral-700">
      <div class="flex-1">
        <IconButton hx-get="/" hx-push-url="true" hx-target="#root">
          <IconArrowLeft />
        </IconButton>
      </div>

      <p class="flex-3 text-lg font-bold">{props.title}</p>
      <div class="flex-1"></div>
    </div>
  );
};
