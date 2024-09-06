
import { Err } from "../../result";
import type { MediaDb } from "./media-db";


export const MediaDbImplTmdbMovie = (): MediaDb => {
  return {
    async put(media) {
        return Err("Not implemented");
    },
    async query(query) {
      const params = new URLSearchParams();



      return Err("Not implemented");
    },
  }
}