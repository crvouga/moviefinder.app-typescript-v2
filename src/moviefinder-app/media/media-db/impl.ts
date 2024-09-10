import { Err } from "../../../core/result";
import type { IMediaDb } from "./interface";
import * as ImplInMemory from "./impl-in-memory";
import * as ImplTmdbMovie from "./impl-tmdb-movie";

export type Config =
  | {
      t: "in-memory";
    }
  | (ImplTmdbMovie.Config & {
      t: "tmdb-movie";
    });

export const MediaDb = (config: Config): IMediaDb => {
  switch (config.t) {
    case "in-memory": {
      return ImplInMemory.MediaDb();
    }
    case "tmdb-movie": {
      return ImplTmdbMovie.MediaDb(config);
    }
  }
};
