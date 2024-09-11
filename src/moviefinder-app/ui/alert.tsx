export const AlertError = (input: { label: string }) => {
  return (
    <div
      class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <strong class="font-bold">Error</strong>
      <span class="block sm:inline" safe>
        {input.label}
      </span>
    </div>
  );
};
