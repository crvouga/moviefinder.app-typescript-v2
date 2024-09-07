import { fromRequest } from "src/core/req/adapter-fetch-api";
import { html } from "../core/res";
import { toResponse } from "../core/res/adapter-fetch-api";
import { ViewDocument } from "./app/document";
import * as Ctx from "./ctx";
import * as Route from "./route";
import { routeHx } from "./router";

const ctx = Ctx.init();

const server = Bun.serve({
  async fetch(request) {
    const route = toRoute(request);
    const req = await fromRequest(request);

    console.log({ timestamp: new Date().toISOString(), route, req });

    if (isHxRequest(request)) {
      const res = await routeHx({
        route,
        ctx,
        req,
      });

      return toResponse(res);
    }

    const res = html(<ViewDocument route={route} />);

    return toResponse(res);
  },
});

console.log(`Server running at http://localhost:${server.port}`);

const isHxRequest = (request: Request): boolean =>
  request.headers.get("HX-Request") === "true";

const toRoute = (request: Request): Route.Route => {
  const url = new URL(request.url);
  return (
    Route.decode(url.pathname.substring(1)) ?? {
      type: "unknown",
    }
  );
};
