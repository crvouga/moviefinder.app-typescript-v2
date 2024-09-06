import { ViewDocument } from "./app/document";
import * as Ctx from "./ctx";
import { html } from "./res";
import { toResponse } from "./res/adapter-fetch-api";
import * as Route from "./route";

const server = Bun.serve({
  async fetch(request, server) {
    const url = new URL(request.url);
    const ctx = Ctx.init();
    const decoded = Route.decode(url.pathname) ?? Route.init();
    console.log(decoded);

    const isHxRequest = request.headers.get("HX-Request") === "true";

    if (isHxRequest && decoded.type === "feed") {
      return toResponse(html(<div>hello</div>));
    }

    const res = html(<ViewDocument route={decoded} />);
    const response = toResponse(res);
    return response;
  },
});

console.log(`Server running at http://localhost:${server.port}`);
