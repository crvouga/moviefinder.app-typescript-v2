import { describe, expect, test } from "bun:test";
import type { Query } from "src/core/query";
import { toPageBasedPagination } from "./query";
import type { PageBased } from "../pagination";

const PAGE_SIZE = 20;

describe(import.meta.file, () => {
  test("first page", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE,
      offset: 0,
    };
    const expected: PageBased[] = [
      {
        index: 0,
        pageSize: PAGE_SIZE,
        page: 1,
      },
    ];
    const actual = toPageBasedPagination(query, PAGE_SIZE);
    expect(actual).toEqual(expected);
  });

  test("second page", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE,
      offset: PAGE_SIZE,
    };
    const expected: PageBased[] = [
      {
        index: 0,
        pageSize: PAGE_SIZE,
        page: 2,
      },
    ];
    const actual = toPageBasedPagination(query, PAGE_SIZE);
    expect(actual).toEqual(expected);
  });

  test("third page", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * 2,
    };
    const expected: PageBased[] = [
      {
        index: 0,
        pageSize: PAGE_SIZE,
        page: 3,
      },
    ];
    const actual = toPageBasedPagination(query, PAGE_SIZE);
    expect(actual).toEqual(expected);
  });

  test("first two pages", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE * 2,
      offset: 0,
    };
    const expected: PageBased[] = [
      {
        index: 0,
        pageSize: PAGE_SIZE,
        page: 1,
      },
      {
        index: 0,
        pageSize: PAGE_SIZE,
        page: 2,
      },
    ];
    const actual = toPageBasedPagination(query, PAGE_SIZE);
    expect(actual).toEqual(expected);
  });

  test("second and third pages", () => {
    const query: Query<unknown> = {
      limit: PAGE_SIZE * 2,
      offset: PAGE_SIZE,
    };
    const expected: PageBased[] = [
      {
        index: 0,
        pageSize: PAGE_SIZE,
        page: 2,
      },
      {
        index: 0,
        pageSize: PAGE_SIZE,
        page: 3,
      },
    ];
    const actual = toPageBasedPagination(query, PAGE_SIZE);
    expect(actual).toEqual(expected);
  });

  test("second page", () => {
    const query: Query<unknown> = {
      offset: Math.floor(PAGE_SIZE * 1.5),
      limit: Math.floor(PAGE_SIZE / 2),
    };

    const expected: PageBased[] = [
      {
        index: 0,
        pageSize: PAGE_SIZE,
        page: 2,
      },
    ];

    const actual = toPageBasedPagination(query, PAGE_SIZE);
    expect(actual).toEqual(expected);
  });
});
