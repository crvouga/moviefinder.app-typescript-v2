import { encode, type Route } from "../route";
import { Spinner } from "../ui/spinner";

const ROOT_ID = "root";
export const ROOT_SELECTOR = `#${ROOT_ID}`;

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
      <body
        class="flex h-[100dvh] max-h-[100dvh] w-full flex-col items-center justify-center bg-black text-white"
        hx-boost="true"
      >
        <div class="h-full max-h-[800px] w-full max-w-[500px] overflow-hidden rounded border">
          <div id={ROOT_ID} class="flex h-full w-full flex-col overflow-hidden">
            <div
              class="flex h-full w-full items-center justify-center"
              hx-get={encode(input.route)}
              hx-trigger="load"
              hx-target={ROOT_SELECTOR}
              hx-swap="innerHTML"
            >
              <Spinner />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
