import { describe, expect, it } from "bun:test";
import * as elements from "typed-html";
import * as Ctx from "../ctx";
import { routeHx, ViewFeedPage } from "./router";

describe("feed router", () => {
  it("should return feed", async () => {
    const res = await routeHx({
      route: {
        type: "feed",
      },
      ctx: Ctx.init(),
    });
    expect(res.type).toBe('html')
    if(res.type === 'html') {
        expect(res.html).toBe(<ViewFeedPage />)
    }
  });
});
