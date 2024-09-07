import { describe, expect, it } from "bun:test";

import * as Ctx from "../ctx";
import { FeedPageLoad, routeHx } from "./router";

describe("feed router", () => {
  it("should return feed", async () => {
    const res = await routeHx({
      route: {
        type: "feed",
      },
      ctx: Ctx.init(),
    });
    expect(res.type).toBe("html");
    if (res.type === "html") {
      expect(res.html).toEqual(<FeedPageLoad />);
    }
  });
});
