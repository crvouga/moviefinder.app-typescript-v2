import type { Result } from "../result";
import type { Sql } from "../sql";

export type IDbConnSql = {
  query: <T>(
    guard: (value: unknown) => value is T,
    query: string,
    params: Sql.Vars,
  ) => Promise<Result<string, { rows: T[] }>>;
};
