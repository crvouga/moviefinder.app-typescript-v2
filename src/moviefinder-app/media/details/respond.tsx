import { ImageSet } from "src/core/image-set";
import { html, type Res } from "src/core/res";
import { isErr } from "src/core/result";
import { ROOT_SELECTOR } from "src/moviefinder-app/app/document";
import { TopBar } from "src/moviefinder-app/app/top-bar";
import type { Ctx } from "src/moviefinder-app/ctx";
import { encode } from "src/moviefinder-app/route";
import { Image } from "src/moviefinder-app/ui/image";
import { Spinner } from "src/moviefinder-app/ui/spinner";
import type { Media } from "../media";
import type { MediaId } from "../media-id";
import type { MediaType } from "../media-type";
import type { Route } from "./route";

export const respond = async (input: {
  ctx: Ctx;
  route: Route;
}): Promise<Res> => {
  switch (input.route.t) {
    case "index": {
      return html(<ViewDetailsLoad {...input.route} />);
    }
    case "load": {
      const got = await input.ctx.mediaDb.query({
        limit: 1,
        offset: 0,
        order: [],
        where: ["=", "mediaId", input.route.mediaId],
      });

      if (isErr(got)) {
        return html(<ViewError />);
      }

      const media = got.value.items[0];

      if (!media) {
        return html(<ViewNotFound />);
      }

      return html(<ViewDetails media={media} />);
    }
  }
};

const ViewError = () => {
  return <div>Error</div>;
};

const ViewNotFound = () => {
  return <div>Not found</div>;
};

const ViewDetailsLoad = (input: {
  mediaId: MediaId;
  mediaType: MediaType;
  mediaTitle: string;
}) => {
  return (
    <div
      class="flex h-full w-full flex-col"
      hx-trigger="load"
      hx-target={ROOT_SELECTOR}
      hx-get={encode({
        t: "media",
        c: {
          t: "details",
          c: {
            ...input,
            t: "load",
          },
        },
      })}
    >
      <TopBar
        backRoute={{
          t: "feed",
          c: {
            t: "index",
          },
        }}
      />

      <div class="aspect-video w-full overflow-hidden border-b">
        <Image class="h-full w-full object-cover" alt=" " src=" " />
      </div>

      <div class="flex w-full flex-1 flex-col items-center p-8">
        <Spinner />
      </div>
    </div>
  );
};

const ViewDetails = (input: { media: Media }) => {
  return (
    <div class="flex h-full w-full flex-col">
      <TopBar
        backRoute={{
          t: "feed",
          c: {
            t: "index",
          },
        }}
      />

      <div class="aspect-video w-full overflow-hidden border-b">
        <Image
          class="h-full w-full object-cover"
          alt={input.media.mediaTitle}
          src={ImageSet.highestRes(input.media.mediaBackdrop) ?? " "}
        />
      </div>

      <div class="flex w-full flex-col gap-4 p-4">
        <p class="text-center text-3xl font-bold">{input.media.mediaTitle}</p>

        <p class="text-center opacity-70">{input.media.mediaDescription}</p>
      </div>
    </div>
  );
};
