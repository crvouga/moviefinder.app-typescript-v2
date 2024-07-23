import type { Route } from "../route";
import { encode } from "../route/route";
import { IconButton } from "./icon-button";
import { IconArrowLeft } from "./icon/icon-arrow-left";

export const TopBar = (props: { title: string; backRoute: Route.Route }) => {
  return (
    <div class="w-full border-b border-neutral-700 h-16 flex items-center justify-center">
      <div class="flex-1">
        <IconButton
          hx-get={encode(props.backRoute)}
          hx-push-url="true"
          hx-target="#root"
        >
          <IconArrowLeft />
        </IconButton>
      </div>

      <p class="text-lg font-bold flex-3">{props.title}</p>
      <div class="flex-1"></div>
    </div>
  );
};
