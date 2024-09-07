export const IconButton = (input: HtmxAttributes) => {
  return (
    <button class="flex items-center justify-center p-4" {...input}>
      {input.children}
    </button>
  );
};
