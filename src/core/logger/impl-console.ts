import type { ILogger } from "./interface";

export type Config = {
  namespace: string[];
};

export const Logger = (input: Config): ILogger => {
  const namespaceStr = input.namespace.map((x) => `[${x}]`).join(" ");
  return {
    log: (...args: unknown[]) => console.log(namespaceStr, ...args),
    error: (...args: unknown[]) => console.error(namespaceStr, ...args),
    warn: (...args: unknown[]) => console.warn(namespaceStr, ...args),
    info: (...args: unknown[]) => console.info(namespaceStr, ...args),
    debug: (...args: unknown[]) => console.debug(namespaceStr, ...args),
    trace: (...args: unknown[]) => console.trace(namespaceStr, ...args),
    child: (namespace: string[]) =>
      Logger({ namespace: [...input.namespace, ...namespace] }),
  };
};
