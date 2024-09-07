import { Button } from "../ui/button";

export const LoginPage = () => {
  return (
    <div class="flex h-full w-full flex-col items-center justify-center gap-6 truncate p-6">
      <div class="flex w-full flex-col truncate">
        <div class="truncate text-2xl font-bold">Log into</div>
        <div class="truncate bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text pb-2 text-4xl font-extrabold text-transparent">
          moviefinder.app
        </div>
      </div>
      <Button
        class="w-full"
        label="Login with phone"
        hx-get="/"
        hx-push-url="true"
        hx-target="#root"
      />
    </div>
  );
};
