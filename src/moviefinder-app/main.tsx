import * as elements from "typed-html";
import { RouteHome } from "./home";
import { handleRequest, isHxRequest } from "./hx";
import { Route } from "./route";
import { Spinner } from "./ui/spinner";
import type { CustomElement } from "./element";
import type { EncodedRoute } from "./route/route";
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
        <title>Bun</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@2.0.1"></script>
      </head>
      <body
        class="bg-black text-white flex items-center justify-center"
        {...attributes}
      >
        <div
          class="border w-full h-full max-w-[500px] max-h-[800px] rounded overflow-hidden"
          hx-boost
          hx-get={attributes.route}
          hx-trigger="load"
        >
          {content}
          <Spinner />
        </div>
      </body>
    </html>
  );
};

Bun.serve({
  port,
  fetch(request, server) {
    const response = handleRequest(request);

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
