import { html, type Res } from "src/core/res";
import type { Ctx } from "src/moviefinder-app/ctx";
import type { Route } from "./route";

export const routeHx = async (input: {
  ctx: Ctx;
  route: Route;
}): Promise<Res> => {
  return html(
    <div>
      <h1>Details</h1>
    </div>,
  );
};
