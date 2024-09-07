export const TextField = ({
  label,
  ...input
}: HtmxAttributes &
  JSX.HtmlInputTag & {
    label: string;
  }) => {
  return (
    <div class="w-full">
      <label class="mb-2 block text-sm font-bold text-white">{label}</label>
      <input
        class="focus:shadow-outline w-full appearance-none rounded border border-neutral-800 bg-neutral-700 px-5 py-4 text-lg leading-tight text-white shadow focus:border-blue-500 focus:outline-none"
        {...input}
      />
    </div>
  );
};
