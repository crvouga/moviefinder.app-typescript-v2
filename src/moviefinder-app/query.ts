export type QueryWhere<T> =
  | ["=" | "!=" | ">" | "<" | ">=" | "<=", keyof T, T[keyof T]]
  | ["in" | "not in", keyof T, T[keyof T][]]
  | ["and" | "or", QueryWhere<T>, QueryWhere<T>];

export type Query<T> = {
  limit: number;
  offset: number;
  order: [keyof T, "asc" | "desc"][];
  where: QueryWhere<T>;
};
