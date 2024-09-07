import { encode, type Route } from "../route";
import { Spinner } from "../ui/spinner";

export const ViewDocument = (input: { route: Route }) => {
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
      <body class="flex items-center justify-center bg-black text-white">
        <div
          class="h-full max-h-[800px] w-full max-w-[500px] overflow-hidden rounded border"
          hx-boost="true"
          id="root"
        >
          <div
            class="flex h-full w-full items-center justify-center"
            hx-get={encode(input.route)}
            hx-trigger="load"
            hx-target="#root"
            hx-swap="innerHTML"
          >
            <Spinner />
          </div>
        </div>
      </body>
    </html>
  );
};
