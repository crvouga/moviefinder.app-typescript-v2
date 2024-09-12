import type { ILogger } from "./interface";

export const Logger = (): ILogger => {
  return {
    log: (..._args) => {},
    error: (..._args) => {},
    warn: (..._args) => {},
    info: (..._args) => {},
    debug: (..._args) => {},
    trace: (..._args) => {},
    child: (_) => Logger(),
  };
};
