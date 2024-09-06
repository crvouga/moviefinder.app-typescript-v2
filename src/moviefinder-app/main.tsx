import * as elements from "typed-html";
import { RouteHome } from "./home";
import { handleRequest, isHxRequest } from "./hx";
import { Route } from "./route";
import { Spinner } from "./ui/spinner";
import type { CustomElement } from "./element";
import type { EncodedRoute } from "./route/route";
import { getDeps, type Deps } from "./deps";
// @ts-ignore
globalThis.elements = elements;

const port = import.meta.env["PORT"] ?? 3000;

const Document: CustomElement<{ route: EncodedRoute }> = (
  attributes,
  content
) => {
  return (
    <html>
      <head>
        <title>moviefinder.app</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@2.0.1"></script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
      </head>
      <body
        class="bg-black text-white flex items-center justify-center"
        {...attributes}
      >
        <div
          class="border border-neutral-600 w-full h-full max-w-[500px] max-h-[800px] rounded overflow-hidden"
          hx-boost
          hx-get={attributes.route}
          hx-trigger="load"
          id="root"
        >
          <div class="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        </div>
      </body>
    </html>
  );
};

const deps = getDeps();

Bun.serve({
  port,
  async fetch(request, server) {
    const response = await handleRequest(request);

    if (response) {
      return response;
    }

    if (isHxRequest(request)) {
      return new Response(null, {
        status: 404,
      });
    }

    return new Response(
      (
        <Document
          route={Route.encode(Route.toRoute(request.url) ?? RouteHome())}
        />
      ),
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
});
console.log(`Server running at http://localhost:${port}`);
