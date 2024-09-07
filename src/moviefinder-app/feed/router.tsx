import type { Res } from "src/core/res";
import { html } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
import type { Route } from "./route";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import { encode } from "../route";
import { ROOT_SELECTOR } from "../app/document";
import { Spinner } from "../ui/spinner";

export const routeHx = async ({
  route,
  ctx,
}: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (route.type) {
    case "feed": {
      return html(<FeedPageLoad />);
    }
    case "feed.controls": {
      const queried = await ctx.mediaDb.query({
        limit: 10,
        offset: 0,
        order: [["mediaGenre", "asc"]],
        where: ["<", "mediaGenre", ["action", "comedy"]],
      });

      switch (queried.type) {
        case "err": {
          return html(<FeedPage />);
        }

        case "ok": {
          return html(<FeedPage />);
        }
      }
    }
    case "feed.load": {
      return html(<FeedPage />);
    }
    case "feed.load-more": {
      return html(<FeedPage />);
    }
  }
};

export const FeedPageLoad = () => {
  return (
    <div
      class="flex h-full w-full items-center justify-center"
      hx-get={encode({
        type: "feed",
        child: {
          type: "feed.load",
        },
      })}
      hx-trigger="load"
      hx-target={ROOT_SELECTOR}
      hx-swap="innerHTML"
    >
      <Spinner />
    </div>
  );
};

export const FeedPage = () => {
  return (
    <div class="flex h-full w-full flex-col">
      <div class="w-full flex-1"></div>
      <AppBottomButtonBar active="feed" />
    </div>
  );
};
