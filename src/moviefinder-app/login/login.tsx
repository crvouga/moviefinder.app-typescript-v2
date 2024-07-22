import type { CustomElement } from "../element";
import { hx } from "../hx";
import { html } from "../response";
import { encode, Route } from "../route/route";
import { Button } from "../ui/button";
import { RouteLoginWithPhonePage } from "./login-with-phone/login-with-phone";

export const RouteLoginPage = Route("login-page");

export const LoginPage: CustomElement = (attrs, content) => {
  return (
    <div class="w-full h-full flex flex-col justify-center items-center p-6 gap-6 truncate">
      <div class="w-full flex flex-col truncate">
        <div class="text-2xl font-bold truncate">Log into</div>
        <div class="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text pb-2 text-4xl font-extrabold text-transparent truncate">
          moviefinder.app
        </div>
      </div>
      <Button
        class="w-full"
        label="Login with phone"
        hx-get={encode(RouteLoginWithPhonePage())}
        hx-push-url="true"
        hx-target="#root"
      />
    </div>
  );
};

hx(RouteLoginPage, () => {
  return html(<LoginPage />);
});
