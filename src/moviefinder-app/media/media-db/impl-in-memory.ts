import { Err, Ok } from "../../../core/result";
import type { Media } from "../media";
import type { IMediaDb } from "./interface";

export const MediaDb = (): IMediaDb => {
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
