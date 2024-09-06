import * as elements from "typed-html";
import type { Ctx } from "../ctx";
import type { Res } from "../res";
import { html } from "../res";
import type { Route } from "./route";

export const routeHx = async ({
  route,
  ctx,
}: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (route.type) {
    case "feed": {
      const queried = await ctx.mediaDb.query({
        limit: 10,
        offset: 0,
        order: [["mediaGenre", "asc"]],
        where: ["<", "mediaGenre", ["action", "comedy"]],
      });
      switch (queried.type) {
        case "err": {
          return html(<ViewFeedPage />);
        }
        case "ok": {
          return html(<ViewFeedPage />);
        }
      }
    }
    case "feed.controls": {
      return html(<ViewFeedPage />);
    }
    case "feed.load": {
      return html(<ViewFeedPage />);
    }
    case "feed.load-more": {
      return html(<ViewFeedPage />);
    }
  }
};

export const ViewFeedPage = () => {
  return <div>FeedPage</div>;
};
