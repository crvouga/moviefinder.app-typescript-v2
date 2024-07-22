import type { CustomElement } from "./element";
import { hx } from "./hx";
import { html } from "./response";
import { encode, Route } from "./route/route";

export const RouteHome = Route("home");

let count = 0;

const RouteInc = Route("inc");

const Counter: CustomElement<{ count: number }> = (attrs, content) => {
  return (
    <div id="root">
      Counter
      <button hx-target="#root" hx-post={encode(RouteInc())}>
        {attrs.count}
      </button>
      ;
    </div>
  );
};

hx(RouteInc, () => {
  const countNew = count + 1;
  count = countNew;
  return html(<Counter count={countNew} />);
});

hx(RouteHome, (request) => {
  return html(
    <div>
      Home
      <Counter count={count} />
    </div>
  );
});
