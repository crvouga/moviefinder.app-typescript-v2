import type { ILogger } from "./interface";

export const Logger = (input?: { namespace: string[] }): ILogger => {
  return {
    log: (...args: unknown[]) => console.log(...args),
    error: (...args: unknown[]) => console.error(...args),
    warn: (...args: unknown[]) => console.warn(...args),
    info: (...args: unknown[]) => console.info(...args),
    debug: (...args: unknown[]) => console.debug(...args),
    trace: (...args: unknown[]) => console.trace(...args),
    child: (namespace: string[]) =>
      Logger({
        namespace: [...(input?.namespace ?? []), ...namespace],
      }),
  };
};
