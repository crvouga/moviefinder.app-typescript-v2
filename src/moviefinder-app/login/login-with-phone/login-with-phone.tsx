import { Spinner } from "../../ui/spinner";
import { TopBar } from "../../ui/top-bar";

export const LoginWithPhonePage = () => {
  return (
    <div class="w-full flex flex-col">
      <TopBar title="Login with phone" backRoute="" />
      <div hx-get="/" hx-trigger="load">
        <Spinner />
      </div>
    </div>
  );
};
