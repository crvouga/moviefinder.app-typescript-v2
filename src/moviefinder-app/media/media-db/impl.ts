import { Err } from "../../../core/result";
import type { IMediaDb } from "./interface";
import * as ImplInMemory from "./impl-in-memory";
import * as ImplTmdbMovie from "./impl-tmdb-movie";

export type Config =
  | {
      type: "in-memory";
    }
  | (ImplTmdbMovie.Config & {
      type: "tmdb-movie";
    });

export const MediaDb = (config: Config): IMediaDb => {
  switch (config.type) {
    case "in-memory": {
      return ImplInMemory.MediaDb();
    }
    case "tmdb-movie": {
      return ImplTmdbMovie.MediaDb(config);
    }
  }
};
