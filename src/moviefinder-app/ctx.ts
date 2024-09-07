import type { IMediaDb } from "./media/media-db/interface";
import { MediaDb } from "./media/media-db";

export type Ctx = {
  mediaDb: IMediaDb;
};

export const init = (): Ctx => {
  return {
    mediaDb: MediaDb({
      type: "tmdb-movie",
    }),
  };
};
