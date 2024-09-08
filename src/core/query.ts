type Primitive = string | number | boolean;

export type QueryWhere<T> =
  | ["=" | "!=" | ">" | "<" | ">=" | "<=", keyof T, Primitive]
  | ["in" | "not in", keyof T, Primitive[]]
  | ["and" | "or", ...QueryWhere<T>[]];

export type Query<T> = {
  limit: number;
  offset: number;
  order: [keyof T, "asc" | "desc"][];
  where: QueryWhere<T>;
};
