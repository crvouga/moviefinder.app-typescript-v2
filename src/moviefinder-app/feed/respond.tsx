import { ImageSet } from "src/core/image-set";
import type { Res } from "src/core/res";
import { html, redirect } from "src/core/res";
import { isErr } from "src/core/result";
import type { Ctx } from "src/moviefinder-app/ctx";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import { ROOT_SELECTOR } from "../app/document";
import type { Media } from "../media/media";
import { encode } from "../route";
import { Spinner } from "../ui/spinner";
import { SwiperContainer, SwiperSlide } from "../ui/swiper";
import { FeedId } from "./feed-id";
import type { FeedItem } from "./feed-item";
import type { Route } from "./route";
import { Image } from "../ui/image";

export const respond = async ({
  route,
  ctx,
}: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (route.t) {
    case "feed": {
      if (!route.feedId) {
        const defaultFeedId = FeedId.generate();
        return redirect(
          encode({
            t: "feed",
            c: {
              t: "feed",
              feedId: defaultFeedId,
            },
          }),
        );
      }

      return html(<FeedPage feedId={route.feedId} />);
    }
    case "feed.controls": {
      return html(<FeedPage feedId={route.feedId} />);
    }
    case "feed.load-more": {
      const queried = await ctx.mediaDb.query({
        limit: 10,
        offset: 0,
        order: [["mediaGenreIds", "asc"]],
        where: ["<", "mediaBackdrop", ""],
      });

      if (isErr(queried)) {
        return html(<div>Error</div>);
      }

      const feedItems = queried.value.items.map(
        (media): FeedItem => ({
          media,
          t: "media",
        }),
      );

      return html(
        <ViewFeedItems feedId={route.feedId} feedItems={feedItems} />,
      );
    }
  }
};

const Layout = (input: JSX.HtmlTag) => {
  return (
    <div class="flex h-full w-full flex-col overflow-hidden">
      <div class="flex w-full flex-1 flex-col overflow-hidden">
        {input.children}
      </div>
      <div class="w-full shrink-0">
        <AppBottomButtonBar active="feed" />
      </div>
    </div>
  );
};

export const FeedPage = (input: { feedId: FeedId }) => {
  return (
    <Layout>
      <SwiperContainer
        class="h-full w-full"
        hx-trigger="swiperslidechange from:swiper-container"
        hx-swap="none"
        hx-post="/hello"
      >
        <ViewFeedItemLoadNext feedId={input.feedId} />
      </SwiperContainer>
    </Layout>
  );
};

const ViewFeedItemLoadNext = (input: { feedId: FeedId }) => {
  return (
    <SwiperSlide
      hx-get={encode({
        t: "feed",
        c: {
          t: "feed.load-more",
          feedId: input.feedId,
        },
      })}
      hx-trigger="intersect"
      hx-swap="outerHTML"
    >
      <div class="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    </SwiperSlide>
  );
};

const js = `
swiperEl = document.querySelector('swiper-container')
swiperEl.addEventListener('swiperslidechange', (e) => {
    const swiper = e.detail[0]
    const activeIndex = swiper.activeIndex
    const activeSlide = swiper.slides[activeIndex]
    const feedIndex = parseInt(activeSlide.getAttribute('data-feed-index'), 10)
    if(typeof feedIndex !== 'number' || Number.isNaN(feedIndex)) {
        return
    }
    const endpointTemplate = '$(changeSlideEndpoint)'
    const endpoint = endpointTemplate.replace('0', feedIndex)
    htmx.ajax('POST', endpoint, { swap: 'none' })
    window.history.pushState({}, '', \`/feed?activeIndex=\${feedIndex}\`)
    window.dispatchEvent(new PopStateEvent('popstate'))        
})
`;

export const ViewFeedItems = (input: {
  feedId: FeedId;
  feedItems: FeedItem[];
}) => {
  return (
    <>
      {input.feedItems.map((feedItem) => (
        <SwiperSlide>
          <ViewFeedItem feedItem={feedItem} />
        </SwiperSlide>
      ))}
      <ViewFeedItemLoadNext feedId={input.feedId} />
    </>
  );
};

const ViewFeedItem = (input: { feedItem: FeedItem }) => {
  switch (input.feedItem.t) {
    case "media": {
      return <ViewFeedItemMedia media={input.feedItem.media} />;
    }
  }
};

const ViewFeedItemMedia = (input: { media: Media }) => {
  return (
    <button
      class="h-full w-full"
      hx-target={ROOT_SELECTOR}
      hx-swap="innerHTML"
      hx-push-url="true"
      hx-get={encode({
        t: "media",
        c: {
          t: "details",
          c: {
            mediaId: input.media.mediaId,
            mediaType: input.media.mediaType,
            t: "index",
            mediaTitle: input.media.mediaTitle,
          },
        },
      })}
    >
      <Image
        class="h-full w-full object-cover"
        alt={input.media.mediaTitle}
        src={ImageSet.highestRes(input.media.mediaPoster) ?? " "}
      />
    </button>
  );
};
