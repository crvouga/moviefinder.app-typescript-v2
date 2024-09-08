import { encode } from "../route";
import { BottomButtonBar } from "../ui/bottom-button-bar";
import { IconHome, IconUserCircle } from "../ui/icon";
import { ROOT_SELECTOR } from "./document";

export const AppBottomButtonBar = (input: { active: "feed" | "account" }) => {
  return (
    <BottomButtonBar
      buttons={[
        {
          active: input.active === "feed",
          hxGet: encode({
            type: "feed",
            child: {
              type: "feed",
              feedId: null,
            },
          }),
          icon: <IconHome />,
          hxTarget: ROOT_SELECTOR,
          text: "Feed",
        },
        {
          active: input.active === "account",
          hxGet: encode({
            type: "account",
            child: {
              type: "account",
            },
          }),
          icon: <IconUserCircle />,
          hxTarget: ROOT_SELECTOR,
          text: "Account",
        },
      ]}
    />
  );
};
