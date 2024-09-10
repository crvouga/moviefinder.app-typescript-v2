import { fromRequest, wrapSessionId } from "src/core/req/adapter-fetch-api";
import { html } from "../core/res";
import { toResponse } from "../core/res/adapter-fetch-api";
import { ViewDocument } from "./app/document";
import * as Ctx from "./ctx";
import { DATABASE_URL, TMDB_API_READ_ACCESS_TOKEN } from "./env";
import * as Route from "./route";
import { routeHx } from "./router";

const main = async () => {
  const ctx = await Ctx.init({
    tmdbApiReadAccessToken: TMDB_API_READ_ACCESS_TOKEN,
    databaseUrl: DATABASE_URL,
  });

  const server = Bun.serve({
    fetch: wrapSessionId({
      cookieName: "moviefinder-app-session-id",
      fetch: async (sessionId, request) => {
        const route = toRoute(request);

        const req = await fromRequest(request, sessionId);

        ctx.logger.info(new Date().toISOString(), route, req);

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
    }),
  });

  ctx.logger.log(`Server running at http://localhost:${server.port}`);
};

main();

const isHxRequest = (request: Request): boolean =>
  request.headers.get("HX-Request") === "true";

const toRoute = (request: Request): Route.Route => {
  const url = new URL(request.url);
  return (
    Route.decode(url.pathname.substring(1)) ?? {
      t: "unknown",
    }
  );
};
