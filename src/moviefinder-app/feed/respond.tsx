import { ImageSet } from "src/core/image-set";
import type { Req } from "src/core/req";
import type { Res } from "src/core/res";
import { empty, html, redirect } from "src/core/res";
import { Result, isErr } from "src/core/result";
import type { Ctx } from "src/moviefinder-app/ctx";
import { AppBottomButtonBar } from "../app/bottom-button-bar";
import { ROOT_SELECTOR } from "../app/document";
import type { Media } from "../media/media";
import { encode } from "../route";
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

      await input.ctx.feedDb.put(feed);
      await input.ctx.sessionFeedMappingDb.put(
        input.req.sessionId,
        feed.feedId,
      );

      console.log("feed", feed);

      return redirect(
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
        order: [["mediaGenreIds", "asc"]],
        where: ["and"],
      });

      if (isErr(queried)) {
        return html(<div>Error</div>);
      }

      const feedItems = queried.value.items.map(
        (media, slideIndex): FeedItem => ({
          media,
          t: "media",
          feedIndex: slideIndex + feed.activeIndex,
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
      await input.ctx.sessionFeedMappingDb.put(
        input.req.sessionId,
        feedNew.feedId,
      );

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

export const ViewFeedPage = (input: { feedId: FeedId }) => {
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
        <ViewLoadInitial feedId={input.feedId} />
      </SwiperContainer>
    </Layout>
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
      // hx-trigger="intersect"
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
      {input.feedItems.map((feedItem) => (
        <SwiperSlide class="h-full w-full" data-feed-index={feedItem.feedIndex}>
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
