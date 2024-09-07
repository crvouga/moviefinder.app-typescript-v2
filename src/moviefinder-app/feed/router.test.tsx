import { describe, expect, it } from "bun:test";

import * as Ctx from "../ctx";
import { FeedPageLoad, routeHx } from "./router";
import { BaseFixture } from "../fixture";

const Fixture = () => {
  const f = BaseFixture();
  return {
    ...f,
  };
};

describe("feed router", () => {
  it("should return feed", async () => {
    const f = Fixture();
    const res = await routeHx({
      ...f,
      route: {
        type: "feed",
      },
    });
    expect(res.type).toBe("html");
    if (res.type === "html") {
      expect(res.html).toEqual(<FeedPageLoad />);
    }
  });
});
