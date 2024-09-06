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
      <body class="bg-black text-white flex items-center justify-center">
        <div
          class="border w-full h-full max-w-[500px] max-h-[800px] rounded overflow-hidden"
          hx-boost="true"
          id="root"
        >
          <div
            class="w-full h-full flex items-center justify-center"
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
