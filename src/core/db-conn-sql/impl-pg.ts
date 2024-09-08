import pg from "pg";
import type { ILogger } from "../logger";
import { Err, Ok, type Result } from "../result";
import { Sql } from "../sql";
import type { IDbConnSql } from "./interface";

declare global {
  var pgPool: pg.Pool;
  var pgPoolClient: pg.PoolClient;
}

const connect = async (databaseUrl: string) => {
  globalThis.pgPool ??= new pg.Pool({
    connectionString: databaseUrl,
  });
  globalThis.pgPoolClient ??= await globalThis.pgPool.connect();
};

export type Config = {
  databaseUrl: string;
  logger: ILogger;
};

export const DbConnSql = async ({
  databaseUrl,
  logger,
}: Config): Promise<IDbConnSql> => {
  await connect(databaseUrl);

  return {
    async query<T>(
      guard: (value: unknown) => value is T,
      rawSql: string,
      params: Sql.Vars,
    ): Promise<Result<string, { rows: T[] }>> {
      const sql = Sql.to(rawSql, params);
      try {
        const start = Date.now();

        let queried: pg.QueryResult<any>;
        try {
          queried = await pgPool.query(sql);
        } catch (error) {
          logger.error(`Errored while querying\nerror=${error}\nsql=${rawSql}`);
          logger.info("Reconnecting to database to retry query");
          await connect(databaseUrl);
          queried = await pgPool.query(sql);
        }

        const end = Date.now();

        logQuery({
          logger,
          sql: Sql.toLog(rawSql, params),
          start,
          end,
        });

        const output: T[] = [];

        for (let i = 0; i < queried.rows.length; i++) {
          const row = queried.rows[i]!;
          for (const columnKey in row) {
            const value = row[columnKey];

            if (value instanceof Date) {
              row[columnKey] = value.toUTCString();
            }
          }

          if (guard(row)) {
            output.push(row);
          } else {
            logger.error(`Failed to guard row\nrow=${row}`);
          }
        }

        return Ok({ rows: output });
      } catch (error) {
        console.error(sql, error);
        logger.error(`${error} sql=${rawSql}`);
        return Err(String(error));
      }
    },

    // async onNotification(callback) {
    //   const cb = (notification: pg.Notification) => {
    //     callback({
    //       processId: notification.processId,
    //       channel: notification.channel,
    //       payload: notification.payload,
    //     });
    //   };

    //   pgPoolClient.on("notification", cb);

    //   return () => {
    //     pgPoolClient.off("notification", cb);
    //   };
    // },
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

  logger.info(`duration=${durationFormatted} sql=\n${sql.slice(0, 1000)}`);
};
