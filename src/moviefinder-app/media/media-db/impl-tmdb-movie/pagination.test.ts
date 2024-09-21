import { describe, expect, test } from "bun:test";
import type { Query } from "src/core/query";
import { toTmdbDiscoverMovieParams } from ".";
import { PAGE_SIZE } from "../tmdb-api";
import type { TmdbDiscoverMovieParams } from "../tmdb-api/discover/movie";

describe(import.meta.file, () => {
  test("pagination page 1", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE,
      offset: 0,
    };
    const expected: TmdbDiscoverMovieParams[] = [
      {
        page: 1,
      },
    ];
    const actual = toTmdbDiscoverMovieParams(query);
    expect(actual).toEqual(expected);
  });

  test("pagination page 2", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE,
      offset: PAGE_SIZE,
    };
    const expected: TmdbDiscoverMovieParams[] = [
      {
        page: 2,
      },
    ];
    const actual = toTmdbDiscoverMovieParams(query);
    expect(actual).toEqual(expected);
  });

  test("pagination page 3", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * 2,
    };
    const expected: TmdbDiscoverMovieParams[] = [
      {
        page: 3,
      },
    ];
    const actual = toTmdbDiscoverMovieParams(query);
    expect(actual).toEqual(expected);
  });

  test("pagination first two pages", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE * 2,
      offset: 0,
    };
    const expected: TmdbDiscoverMovieParams[] = [
      {
        page: 1,
      },
      {
        page: 2,
      },
    ];
    const actual = toTmdbDiscoverMovieParams(query);
    expect(actual).toEqual(expected);
  });

  test("pagination second and third pages", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE * 2,
      offset: PAGE_SIZE,
    };
    const expected: TmdbDiscoverMovieParams[] = [
      {
        page: 2,
      },
      {
        page: 3,
      },
    ];
    const actual = toTmdbDiscoverMovieParams(query);
    expect(actual).toEqual(expected);
  });

  test("pagination second page", () => {
    const query: Query<unknown> = {
      offset: Math.floor(PAGE_SIZE * 1.5),
      limit: Math.floor(PAGE_SIZE / 2),
    };

    const expected: TmdbDiscoverMovieParams[] = [
      {
        page: 2,
      },
    ];

    const actual = toTmdbDiscoverMovieParams(query);
    expect(actual).toEqual(expected);
  });
});
