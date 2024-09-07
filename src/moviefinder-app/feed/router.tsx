import type { Res } from "src/core/res";
import { html } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
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
  return <div>Hello</div>;
};
