import { encode } from "../route";
import { BottomButtonBar } from "../ui/bottom-button-bar";
import { IconHome, IconUserCircle } from "../ui/icon";
import { ROOT_SELECTOR } from "./document";

export const AppBottomButtonBar = async (input: {
  active: "feed" | "account";
}) => {
  return (
    <BottomButtonBar
      buttons={[
        {
          active: input.active === "feed",
          hxGet: encode({
            t: "feed",
            c: {
              t: "feed",
              feedId: null,
            },
          }),
          icon: await (<IconHome />),
          hxTarget: ROOT_SELECTOR,
          text: "Feed",
        },
        {
          active: input.active === "account",
          hxGet: encode({
            t: "account",
            c: {
              t: "account",
            },
          }),
          icon: await (<IconUserCircle />),
          hxTarget: ROOT_SELECTOR,
          text: "Account",
        },
      ]}
    />
  );
};
