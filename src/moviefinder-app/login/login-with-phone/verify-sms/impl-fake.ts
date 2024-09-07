import { Err, Ok } from "src/core/result";
import type { IVerifySms } from "./interface";
import type { ILogger } from "src/core/logger";

export type Config = {
  code: string;
  logger: ILogger;
};

export const VerifySms = (config: Config): IVerifySms => {
  return {
    async sendCode(input) {
      config.logger.info(`Sending code ${config.code} to phone ${input.phone}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Ok(null);
    },
    async verifyCode(input) {
      config.logger.info(
        `Verifying code ${input.code} for phone ${input.phone}`,
      );
      if (input.code !== config.code) {
        config.logger.error(`Invalid code ${input.code}`);
        return Err({
          type: "wrong-code",
        });
      }
      return Ok(null);
    },
  };
};
