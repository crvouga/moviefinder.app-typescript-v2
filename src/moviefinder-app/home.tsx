import type { CustomElement } from "./shared/element";
import { hx } from "./hx";
import { RouteLoginPage } from "./login/login";
import { html, redirect } from "./shared/res";
import { encode, Route } from "./shared/route/route";

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

export const RouteHome = Route("home");

const isLoggedOut = true;

hx(RouteHome, (request) => {
  if (isLoggedOut) {
    return redirect(RouteLoginPage());
  }

  return html(
    <div>
      Home
      <Counter count={count} />
    </div>
  );
});
