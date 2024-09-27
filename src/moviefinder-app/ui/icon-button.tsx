export const IconButton = (input: JSX.HtmlButtonTag & { label?: string }) => {
  return (
    <button
      class="flex aspect-square h-16 w-16 flex-1 flex-col items-center justify-center rounded-full text-xs font-bold drop-shadow-lg transition-opacity active:opacity-60"
      style={{
        textShadow: "0px 0px 4px rgba(0, 0, 0, 1)",
      }}
      {...input}
    >
      <span>{input.children}</span>
      {input.label && <span class="text-[10px]">{input.label}</span>}
    </button>
  );
};
