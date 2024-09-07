import { ViewDocument } from "./app/document";
import * as Ctx from "./ctx";
import { html } from "./res";
import { toResponse } from "./res/adapter-fetch-api";
import * as Route from "./route";
import { routeHx } from "./router";

const server = Bun.serve({
  async fetch(request) {
    const url = new URL(request.url);
    const decoded = Route.decode(url.pathname.substring(1)) ?? Route.init();
    const isHxRequest = request.headers.get("HX-Request") === "true";

    const ctx = Ctx.init();

    if (isHxRequest) {
      const res = await routeHx({ route: decoded, ctx });
      return toResponse(res);
    }

    const res = html(<ViewDocument route={decoded} />);
    const response = toResponse(res);
    return response;
  },
});

console.log(`Server running at http://localhost:${server.port}`);
