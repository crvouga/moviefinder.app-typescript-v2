import { AlertError } from "./alert";

export const ViewErrorPage = (input: { error: string }) => {
  return (
    <div class="flex h-full w-full items-center justify-center p-8">
      <AlertError label={input.error} />
    </div>
  );
};
