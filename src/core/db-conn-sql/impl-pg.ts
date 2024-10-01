import postgres from "postgres";
import type { ILogger } from "../logger";
import { Err, Ok, type Result } from "../result";
import { Sql } from "../sql";
import type { IDbConnSql } from "./interface";

export type Config = {
  databaseUrl: string;
  logger: ILogger;
};

export const DbConnSql = async ({
  databaseUrl,
  logger,
}: Config): Promise<IDbConnSql> => {
  const conn = postgres(databaseUrl);

  return {
    async query<T>(
      guard: (value: unknown) => value is T,
      rawSql: string,
      params: Sql.Vars,
    ): Promise<Result<string, { rows: T[] }>> {
      const sql = Sql.to(rawSql, params);
      try {
        const start = Date.now();

        const rows = await conn.unsafe(sql);

        const end = Date.now();

        logQuery({
          logger,
          sql: Sql.toLog(rawSql, params),
          start,
          end,
        });

        const output: T[] = [];

        for (const row of rows) {
          if (guard(row)) {
            output.push(row);
            continue;
          }

          logger.error(`Failed to guard row\nrow=${row}`);
        }

        return Ok({ rows: output });
      } catch (error) {
        logger.error(error);
        return Err(String(error));
      }
    },
  };
};

const logQuery = ({
  sql,
  start,
  end,
  logger,
}: {
  sql: string;
  start: number;
  end: number;
  logger: ILogger;
}) => {
  const durationFormatted = `${end - start}ms`;
  logger.info(`duration=${durationFormatted}\nsql=\n${sql.slice(0, 1000)}`);
};
