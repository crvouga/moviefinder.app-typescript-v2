import { ImageSet } from "src/core/image-set";
import type { Req } from "src/core/req";
import type { Res } from "src/core/res";
import { empty, html, hxPushUrl, redirect } from "src/core/res";
import { Result, isErr } from "src/core/result";
import type { Ctx } from "src/moviefinder-app/ctx";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import { ROOT_SELECTOR } from "../app/document";
import { ViewMediaFeedbackForm } from "../media/feedback/respond";
import type { Media } from "../media/media";
import { encode } from "../route";
import { ViewErrorPage } from "../ui/error-page";
import { Image } from "../ui/image";
import { Spinner } from "../ui/spinner";
import { SwiperContainer, SwiperSlide } from "../ui/swiper";
import { Feed } from "./feed";
import { FeedId } from "./feed-id";
import type { FeedItem } from "./feed-item";
import type { Route } from "./route";

export const respond = async (input: {
  route: Route;
  req: Req;
  ctx: Ctx;
}): Promise<Res> => {
  switch (input.route.t) {
    case "index": {
      const maybeFeedId = Result.withDefault(
        await input.ctx.sessionFeedMappingDb.get(input.req.sessionId),
        null,
      );

      const maybeFeed = maybeFeedId
        ? Result.withDefault(await input.ctx.feedDb.get(maybeFeedId), null)
        : null;

      const feed = maybeFeed ?? Feed.init();

      await Promise.allSettled([
        input.ctx.feedDb.put(feed),
        input.ctx.sessionFeedMappingDb.put(input.req.sessionId, feed.feedId),
      ]);

      return hxPushUrl(
        await html(<ViewFeedPage feedId={feed.feedId} />),
        encode({
          t: "feed",
          c: {
            t: "feed",
            feedId: feed.feedId,
            feedIndex: feed.activeIndex,
          },
        }),
      );
    }

    case "feed": {
      return html(<ViewFeedPage feedId={input.route.feedId} />);
    }

    case "controls": {
      return html(<ViewFeedPage feedId={input.route.feedId} />);
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
        order: [["mediaPopularity", "desc"]],
      });

      if (isErr(queried)) {
        return html(<ViewErrorPage error={queried.error} />);
      }

      const feedItems = queried.value.items.map(
        (media, slideIndex): FeedItem => ({
          media,
          t: "media",
          feedIndex: slideIndex + feed.activeIndex,
        }),
      );

      return html(
        <ViewFeedItems
          ctx={input.ctx}
          feedId={input.route.feedId}
          feedItems={feedItems}
        />,
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

      await Promise.all([
        input.ctx.feedDb.put(feedNew),
        input.ctx.sessionFeedMappingDb.put(input.req.sessionId, feedNew.feedId),
      ]);

      return empty();
    }
  }
};

const unknownToNumber = (input: unknown): number | null => {
  switch (typeof input) {
    case "number": {
      return input;
    }
    case "string": {
      const parsed = parseInt(input, 10);
      if (isNaN(parsed)) {
        return null;
      }
      return parsed;
    }
    default: {
      return null;
    }
  }
};

const ViewLayout = (input: JSX.HtmlTag) => {
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

export const ViewFeedPage = (input: { feedId: FeedId }) => {
  return (
    <ViewLayout>
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
        <ViewLoadInitial feedId={input.feedId} />
      </SwiperContainer>
    </ViewLayout>
  );
};

const ViewLoadInitial = (input: { feedId: FeedId }) => {
  return (
    <div
      class="flex h-full w-full items-center justify-center"
      hx-get={encode({
        t: "feed",
        c: {
          t: "load-more",
          feedId: input.feedId,
        },
      })}
      hx-trigger="load"
      hx-swap="outerHTML"
    >
      <Spinner />
    </div>
  );
};

const ViewFeedItemLoadNext = (input: { feedId: FeedId }) => {
  return (
    <SwiperSlide
      class="h-full w-full"
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
  ctx: Ctx;
}) => {
  return (
    <>
      {input.feedItems.map((feedItem) => (
        <ViewFeedItem ctx={input.ctx} feedItem={feedItem} />
      ))}
      <ViewFeedItemLoadNext feedId={input.feedId} />
    </>
  );
};

const ViewFeedItem = (input: { feedItem: FeedItem; ctx: Ctx }) => {
  return (
    <SwiperSlide
      class="h-full w-full"
      data-feed-index={input.feedItem.feedIndex}
    >
      <ViewFeedItemContent {...input} feedItem={input.feedItem} />
      {false && <ViewMediaFeedbackForm />}
    </SwiperSlide>
  );
};

const ViewFeedItemContent = (input: { feedItem: FeedItem; ctx: Ctx }) => {
  switch (input.feedItem.t) {
    case "media": {
      return <ViewFeedItemMedia {...input} media={input.feedItem.media} />;
    }
  }
};

const ViewFeedItemMedia = (input: { media: Media; ctx: Ctx }) => {
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
