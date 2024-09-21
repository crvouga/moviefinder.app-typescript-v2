import { describe, expect, test } from "bun:test";
import type { Query } from "src/core/query";
import type { NonEmpty } from "../non-empty";
import type { PageBased } from "../pagination";
import { toPageBasedPagination } from "./query";

const pageSize = 20;

describe(import.meta.file, () => {
  test("first page", () => {
    const query: Query<unknown> = {
      limit: pageSize,
      offset: 0,
    };
    const expected: NonEmpty<PageBased> = [
      {
        index: 0,
        pageSize,
        page: 1,
      },
    ];
    const actual = toPageBasedPagination({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("second page", () => {
    const query: Query<unknown> = {
      limit: pageSize,
      offset: pageSize,
    };
    const expected: NonEmpty<PageBased> = [
      {
        index: 0,
        pageSize,
        page: 2,
      },
    ];
    const actual = toPageBasedPagination({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("third page", () => {
    const query: Query<unknown> = {
      limit: pageSize,
      offset: pageSize * 2,
    };
    const expected: NonEmpty<PageBased> = [
      {
        index: 0,
        pageSize,
        page: 3,
      },
    ];
    const actual = toPageBasedPagination({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("first two pages", () => {
    const query: Query<unknown> = {
      limit: pageSize * 2,
      offset: 0,
    };
    const expected: NonEmpty<PageBased> = [
      {
        index: 0,
        pageSize,
        page: 1,
      },
      {
        index: 0,
        pageSize,
        page: 2,
      },
    ];
    const actual = toPageBasedPagination({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("second and third pages", () => {
    const query: Query<unknown> = {
      limit: pageSize * 2,
      offset: pageSize,
    };
    const expected: NonEmpty<PageBased> = [
      {
        index: 0,
        pageSize,
        page: 2,
      },
      {
        index: 0,
        pageSize,
        page: 3,
      },
    ];
    const actual = toPageBasedPagination({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("second page", () => {
    const query: Query<unknown> = {
      offset: Math.floor(pageSize * 1.5),
      limit: Math.floor(pageSize / 2),
    };

    const expected: NonEmpty<PageBased> = [
      {
        index: 0,
        pageSize,
        page: 2,
      },
    ];

    const actual = toPageBasedPagination({ query, pageSize });
    expect(actual).toEqual(expected);
  });
});
