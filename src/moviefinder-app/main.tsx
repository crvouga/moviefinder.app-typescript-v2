import { fromRequest, wrapSessionId } from "src/core/req/adapter-fetch-api";
import { html } from "../core/res";
import { toResponse } from "../core/res/adapter-fetch-api";
import { Root } from "./app/root";
import * as Ctx from "./ctx";
import { DATABASE_URL, TMDB_API_READ_ACCESS_TOKEN } from "./env";
import * as Route from "./route";
import { respond } from "./respond";
import { Result, unwrap } from "src/core/result";

const main = async () => {
  const ctx = await Ctx.init({
    tmdbApiReadAccessToken: TMDB_API_READ_ACCESS_TOKEN,
    databaseUrl: DATABASE_URL,
  });

  const server = Bun.serve({
    fetch: wrapSessionId({
      cookieName: "moviefinder-app-session-id",
      fetch: async ({ request, sessionId }) => {
        const route = toRoute(request);

        const userSession = unwrap(
          await ctx.userSessionDb.findBySessionId(sessionId),
          null,
        );

        const user = userSession
          ? unwrap(await ctx.userDb.get(userSession.userId), null)
          : null;

        ctx.currentUser = user;

        const req = await fromRequest(request, sessionId);

        ctx.logger.info(new Date().toISOString(), route, req);

        if (request.headers.get("HX-Request") === "true") {
          const res = await respond({ route, ctx, req });

          return toResponse(res);
        }

        const res = await html(<Root route={route} />);

        return toResponse(res);
      },
    }),
  });

  ctx.logger.log(`Server running at http://localhost:${server.port}`);
};

main();

const toRoute = (request: Request): Route.Route => {
  const url = new URL(request.url);
  return Route.decode(url.pathname.substring(1));
};
