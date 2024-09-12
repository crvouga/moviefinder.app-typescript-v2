import type { ILogger } from "./interface";

export type Config = {
  namespace: string[];
};

export const Logger = (input: Config): ILogger => {
  const namespaceStr = input.namespace.map((x) => `[${x}]`).join(" ");
  return {
    log: (...args) => console.log(namespaceStr, ...args),
    error: (...args) => console.error(namespaceStr, ...args),
    warn: (...args) => console.warn(namespaceStr, ...args),
    info: (...args) => console.info(namespaceStr, ...args),
    debug: (...args) => console.debug(namespaceStr, ...args),
    trace: (...args) => console.trace(namespaceStr, ...args),
    child: (namespace) =>
      Logger({ namespace: [...input.namespace, ...namespace] }),
  };
};
