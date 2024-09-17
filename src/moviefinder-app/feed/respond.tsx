import { ImageSet } from "src/core/image-set";
import type { Res } from "src/core/res";
import { html, redirect } from "src/core/res";
import { Result, isErr } from "src/core/result";
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
import { Feed } from "./feed";
import type { Req } from "src/core/req";

export const respond = async (input: {
  route: Route;
  req: Req;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.t) {
    case "default-feed": {
      const maybeFeedId = Result.withDefault(
        await input.ctx.sessionFeedMappingDb.get(input.req.sessionId),
        null,
      );

      const feedId = maybeFeedId ?? FeedId.generate();

      await input.ctx.sessionFeedMappingDb.put(input.req.sessionId, feedId);

      console.log({
        feedId,
        maybeFeedId,
        sessionId: input.req.sessionId,
      });

      return redirect(
        encode({
          t: "feed",
          c: {
            t: "feed",
            feedId: feedId,
          },
        }),
      );
    }

    case "feed": {
      return html(<FeedPage feedId={input.route.feedId} />);
    }

    case "controls": {
      return html(<FeedPage feedId={input.route.feedId} />);
    }

    case "load-more": {
      const maybeFeed = Result.withDefault(
        await input.ctx.feedDb.get(input.route.feedId),
        null,
      );

      const feed: Feed = maybeFeed ?? Feed.init();

      const queried = await input.ctx.mediaDb.query({
        limit: 10,
        offset: feed.activeIndex,
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
        <ViewFeedItems feedId={input.route.feedId} feedItems={feedItems} />,
      );
    }

    case "changed-slide": {
      const feedIndex = unknownToNumber(input.req.formData["feedIndex"]) ?? 0;

      const maybeFeed = Result.withDefault(
        await input.ctx.feedDb.get(input.route.feedId),
        null,
      );

      const feed = maybeFeed ?? Feed.init();

      const feedNew: Feed = {
        ...feed,
        activeIndex: feedIndex,
      };

      await input.ctx.feedDb.put(feedNew);

      return html(<div>Changed slide</div>);
    }
  }
};

const unknownToNumber = (input: unknown): number | null => {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) {
      return null;
    }
    return parsed;
  }
  return null;
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
        hx-post={encode({
          t: "feed",
          c: {
            t: "changed-slide",
            feedId: input.feedId,
          },
        })}
        hx-vals="js:{feedIndex: parseInt(event?.detail?.[0]?.slides?.[event?.detail?.[0]?.activeIndex]?.getAttribute?.('data-feed-index'), 10)}"
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
          t: "load-more",
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

export const ViewFeedItems = (input: {
  feedId: FeedId;
  feedItems: FeedItem[];
}) => {
  return (
    <>
      {input.feedItems.map((feedItem, slideIndex) => (
        <SwiperSlide data-feed-index={slideIndex}>
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
