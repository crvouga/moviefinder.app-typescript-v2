export const IconButton = (input: HtmxAttributes) => {
  return (
    <button class="p-4 flex items-center justify-center" {...input}>
      {input.children}
    </button>
  );
};
