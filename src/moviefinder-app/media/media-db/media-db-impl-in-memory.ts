import { Err, Ok } from "../../shared/result";
import type { Media } from "../media";
import type { MediaDb } from "./media-db";

export const MediaDbImplInMemory = (): MediaDb => {
  const mediaDb = new Map<string, Media>();
  return {
    async put(media) {
      mediaDb.set(media.mediaId, media);
      return Ok(null);
    },
    async query(query) {
      const params = new URLSearchParams();

      return Err("Not implemented");
    },
  };
};
