import { describe, expect, test } from "bun:test";
import type { Query } from "src/core/query";
import { toPageBased, type PageBased } from "./pagination";

const pageSize = 20;

describe(import.meta.file, () => {
  test("first page", () => {
    const query: Query<unknown> = {
      limit: pageSize,
      offset: 0,
    };
    const expected: PageBased = {
      index: 0,
      pageSize,
      startPage: 1,
      endPage: 1,
    };
    const actual = toPageBased({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("second page", () => {
    const query: Query<unknown> = {
      limit: pageSize,
      offset: pageSize,
    };
    const expected: PageBased = {
      index: 0,
      pageSize,
      startPage: 2,
      endPage: 2,
    };
    const actual = toPageBased({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("third page", () => {
    const query: Query<unknown> = {
      limit: pageSize,
      offset: pageSize * 2,
    };
    const expected: PageBased = {
      index: 0,
      pageSize,
      startPage: 3,
      endPage: 3,
    };
    const actual = toPageBased({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("first two pages", () => {
    const query: Query<unknown> = {
      limit: pageSize * 2,
      offset: 0,
    };
    const expected: PageBased = {
      index: 0,
      pageSize,
      startPage: 1,
      endPage: 2,
    };
    const actual = toPageBased({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("second and third pages", () => {
    const query: Query<unknown> = {
      limit: pageSize * 2,
      offset: pageSize,
    };
    const expected: PageBased = {
      index: 0,
      pageSize,
      startPage: 2,
      endPage: 3,
    };
    const actual = toPageBased({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("second page", () => {
    const query: Query<unknown> = {
      offset: Math.floor(pageSize * 1.5),
      limit: Math.floor(pageSize / 2),
    };

    const expected: PageBased = {
      index: Math.floor(pageSize / 2),
      pageSize,
      startPage: 2,
      endPage: 3,
    };

    const actual = toPageBased({ query, pageSize });
    expect(actual).toEqual(expected);
  });

  test("edge case", () => {
    const query: Query<unknown> = {
      limit: 10,
      offset: 19,
    };
    const expected: PageBased = {
      index: 19,
      startPage: 1,
      endPage: 2,
      pageSize: 20,
    };
    const actual = toPageBased({ query, pageSize });
    expect(actual).toEqual(expected);
  });
});
