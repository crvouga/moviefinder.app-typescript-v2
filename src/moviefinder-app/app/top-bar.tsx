import { encode, Route } from "../route";
import { IconArrowLeft } from "../ui/icon";
import { IconButton } from "../ui/icon-button";
import { ROOT_SELECTOR } from "./document";

export const TopBar = (input: { title: string; backRoute: Route }) => {
  return (
    <div class="flex h-16 w-full items-center justify-center border-b">
      <div class="flex-1" data-loading-states>
        <IconButton
          hx-get={encode(input.backRoute)}
          hx-push-url="true"
          hx-target={ROOT_SELECTOR}
        >
          <IconArrowLeft />
        </IconButton>
      </div>

      <p class="flex-3 text-lg font-bold">{input.title}</p>
      <div class="flex-1"></div>
    </div>
  );
};
