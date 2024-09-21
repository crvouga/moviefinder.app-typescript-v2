import { toPageBased, type PageBased, type Pagination } from "../pagination";

type Primitive = string | number | boolean;

export type QueryWhere<T> =
  | ["=" | "!=" | ">" | "<" | ">=" | "<=", keyof T, Primitive]
  | ["in" | "not in", keyof T, Primitive[]]
  | ["and" | "or", ...QueryWhere<T>[]];

export type Query<T> = {
  limit: number;
  offset: number;
  order?: [keyof T, "asc" | "desc"][];
  where?: QueryWhere<T>;
};

export const toPageBasedPagination = <T>(
  query: Query<T>,
  pageSize: number,
): PageBased[] => {
  const pageCount = Math.ceil(query.limit / pageSize);

  const params: PageBased[] = [];

  for (let i = 0; i < pageCount; i++) {
    const pageBased = toPageBased({
      pageSize,
      pagination: query,
    });
    params.push({
      page: pageBased.page + i,
      index: 0,
      pageSize: pageBased.pageSize,
    });
  }

  return params;
};
