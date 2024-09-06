import * as elements from "typed-html";
import { Spinner } from "./ui/spinner";

const port = import.meta.env["PORT"] ?? 3000;

const ViewDocument: elements.CustomElementHandler = (attributes, content) => {
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

Bun.serve({
  port,
  async fetch(request, server) {
    // const url = new URL(request.url);
    // const ctx = Ctx.init();
    // const decoded = Route.parse(JSON.parse(atob(url.pathname)));
    const res = <div>hello</div>;
    return new Response(res, {
      status: 404,
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});
console.log(`Server running at http://localhost:${port}`);
