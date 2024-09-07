import { encode } from "../route";
import { BottomButtonBar } from "../ui/bottom-button-bar";
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
            },
          }),
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
          hxTarget: ROOT_SELECTOR,
          text: "Account",
        },
      ]}
    />
  );
};
