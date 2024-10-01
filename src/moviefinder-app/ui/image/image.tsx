import { cn } from "../cn";

export const ImageWebComponentScript = async () => {
  const imageWebComponentScript = Bun.file(
    "./src/moviefinder-app/ui/image/image-web-component.js",
  ).text();
  return <script>{imageWebComponentScript}</script>;
};

type Props = {
  src?: string;
  alt: string;
  class?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "image-element": Props;
    }
  }
}

export const Image = (props: Props) => {
  return (
    <image-element
      src={props.src}
      alt={props.alt}
      class={cn("h-full w-full", props.class)}
    />
  );
};
