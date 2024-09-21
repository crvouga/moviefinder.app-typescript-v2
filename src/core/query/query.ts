import { NonEmpty } from "../non-empty";
import { toPageBased, type PageBased } from "../pagination";

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

export const toPageBasedPagination = <T>(input: {
  query: Query<T>;
  pageSize: number;
}): NonEmpty<PageBased> => {
  const pageCount = Math.ceil(input.query.limit / input.pageSize);

  const params: PageBased[] = [];

  for (let i = 0; i < pageCount; i++) {
    const pageBased = toPageBased({
      pageSize: input.pageSize,
      pagination: input.query,
    });

    params.push({
      page: pageBased.page + i,
      index: 0,
      pageSize: pageBased.pageSize,
    });
  }

  if (NonEmpty.is(params)) {
    return params;
  }

  return NonEmpty.init({
    index: 0,
    page: 1,
    pageSize: input.pageSize,
  });
};
