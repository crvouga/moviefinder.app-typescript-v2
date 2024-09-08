import { Err } from "../../../core/result";
import type { IMediaDb } from "./interface";
import * as ImplInMemory from "./impl-in-memory";
import * as ImplTmdbMovie from "./impl-tmdb-movie";

export type Impl =
  | {
      type: "in-memory";
    }
  | (ImplTmdbMovie.Config & {
      type: "tmdb-movie";
    });

export const MediaDb = (impl: Impl): IMediaDb => {
  switch (impl.type) {
    case "in-memory": {
      return ImplInMemory.MediaDb();
    }
    case "tmdb-movie": {
      return ImplTmdbMovie.MediaDb(impl);
    }
  }
};
