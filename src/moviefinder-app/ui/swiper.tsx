// https://swiperjs.com/swiper-api

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": {
        class?: string;
        direction?: "horizontal" | "vertical";
        loop?: boolean;
        autoplay?: {
          delay?: number;
          disableOnInteraction?: boolean;
        };
        pagination?: {
          el?: string;
          clickable?: boolean;
        };
        navigation?: {
          nextEl?: string;
          prevEl?: string;
        };
        scrollbar?: {
          el?: string;
          draggable?: boolean;
        };
        onSlideChange?: () => void;
        onSwiper?: (swiper: any) => void;
        // Add more Swiper API options as needed
        children?: any;
        "slides-per-view"?: number | "auto";
      };
      "swiper-slide": {
        class?: string;
        children?: any;
      };
    }
  }
}

export const SwiperContainer = ({
  children,
  ...input
}: {
  class?: string;
} & HtmxAttributes) => {
  return (
    <swiper-container slides-per-view={1} direction="vertical" {...input}>
      {children}
    </swiper-container>
  );
};

export const SwiperSlide = ({
  children,
  ...input
}: { class?: string } & HtmxAttributes) => {
  return <swiper-slide {...input}>{children}</swiper-slide>;
};
