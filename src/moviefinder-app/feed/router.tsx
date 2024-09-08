import type { Res } from "src/core/res";
import { html } from "src/core/res";
import { isErr } from "src/core/result";
import type { Ctx } from "src/moviefinder-app/ctx";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import type { Media } from "../media/media";
import { encode } from "../route";
import { Spinner } from "../ui/spinner";
import { SwiperContainer, SwiperSlide } from "../ui/swiper";
import type { FeedItem } from "./feed-item";
import type { Route } from "./route";

export const routeHx = async ({
  route,
  ctx,
}: {
  route: Route;
  ctx: Ctx;
}): Promise<Res> => {
  switch (route.type) {
    case "feed": {
      return html(<FeedPage />);
    }
    case "feed.controls": {
      return html(<FeedPage />);
    }
    case "feed.load-more": {
      const queried = await ctx.mediaDb.query({
        limit: 10,
        offset: 0,
        order: [["mediaGenreIds", "asc"]],
        where: ["<", "mediaGenreIds", ["action", "comedy"]],
      });

      if (isErr(queried)) {
        return html(<div>Error</div>);
      }

      const feedItems = queried.value.items.map(
        (media): FeedItem => ({
          media,
          type: "media",
        }),
      );

      return html(<ViewFeedItems feedItems={feedItems} />);
    }
  }
};

const Layout = (input: HtmxAttributes) => {
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

export const FeedPage = () => {
  return (
    <Layout>
      <SwiperContainer class="h-full w-full">
        <ViewFeedItemLoadNext />
      </SwiperContainer>
    </Layout>
  );
};

const ViewFeedItemLoadNext = () => {
  return (
    <SwiperSlide
      hx-get={encode({
        type: "feed",
        child: {
          type: "feed.load-more",
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

export const ViewFeedItems = (input: { feedItems: FeedItem[] }) => {
  return (
    <>
      {input.feedItems
        .map((feedItem) => (
          <SwiperSlide>
            <ViewFeedItem feedItem={feedItem} />
          </SwiperSlide>
        ))
        .join("")}
      <ViewFeedItemLoadNext />
    </>
  );
};

const ViewFeedItem = (input: { feedItem: FeedItem }) => {
  switch (input.feedItem.type) {
    case "media": {
      return <ViewFeedItemMedia media={input.feedItem.media} />;
    }
  }
};

const ViewFeedItemMedia = (input: { media: Media }) => {
  return (
    <div>
      <div>{input.media.mediaTitle}</div>
    </div>
  );
};
