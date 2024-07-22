import type { CustomElement } from "../../element";
import { hx } from "../../hx";
import { html } from "../../response";
import { encode, Route } from "../../route/route";
import { Spinner } from "../../ui/spinner";
import { TopBar } from "../../ui/top-bar";
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
