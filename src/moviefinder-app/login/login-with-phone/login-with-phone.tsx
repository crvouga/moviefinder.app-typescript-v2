import type { CustomElement } from "../../shared/element";
import { hx } from "../../shared/hx";
import { html } from "../../shared/res";
import { encode, Route } from "../../shared/route/route";
import { Spinner } from "../../shared/ui/spinner";
import { TopBar } from "../../shared/ui/top-bar";
import { RouteLoginPage } from "../login";
import { RouteSendCodeForm } from "./send-code";

export const RouteLoginWithPhonePage = Route("login-with-phone-page");

export const LoginWithPhonePage: CustomElement = (attrs, content) => {
  return (
    <div class="w-full flex flex-col">
      <TopBar title="Login with phone" backRoute={RouteLoginPage()} />
      <div hx-get={encode(RouteSendCodeForm())} hx-trigger="load">
        <Spinner />
      </div>
    </div>
  );
};

hx(RouteLoginWithPhonePage, () => {
  return html(<LoginWithPhonePage />);
});
