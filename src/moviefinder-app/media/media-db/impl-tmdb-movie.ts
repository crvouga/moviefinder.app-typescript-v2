import { Err } from "../../../core/result";
import type { IMediaDb } from "./interface";

export const MediaDb = (): IMediaDb => {
  return {
    async put(media) {
      return Err("Not implemented");
    },
    async query(query) {
      const params = new URLSearchParams();

      return Err("Not implemented");
    },
  };
};
