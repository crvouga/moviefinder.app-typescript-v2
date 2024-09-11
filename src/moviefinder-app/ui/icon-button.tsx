export const IconButton = (input: JSX.HtmlButtonTag) => {
  return (
    <button class="flex items-center justify-center p-4" {...input}>
      {input.children}
    </button>
  );
};
