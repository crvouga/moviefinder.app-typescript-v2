import type { MediaDb } from "./media/media-db/media-db";
import { MediaDbImplInMemory } from "./media/media-db/media-db-impl-in-memory";

export type Ctx = {
  mediaDb: MediaDb;
};

export const init = (): Ctx => {
  return {
    mediaDb: MediaDbImplInMemory(),
  };
};
