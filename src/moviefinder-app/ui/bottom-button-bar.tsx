export const BottomButtonBar = (props: {
  buttons: {
    text: string;
    hxGet: string;
    hxTarget: string;
  }[];
}) => {
  return (
    <div class="flex w-full items-center">
      {props.buttons.map((button) => (
        <a
          key={button.text}
          hx-get={button.hxGet}
          hx-target={button.hxTarget}
          class="rounded bg-blue-600 px-2 py-3 text-lg font-bold text-white hover:opacity-80 active:opacity-60"
        >
          {button.text}
        </a>
      ))}
    </div>
  );
};
