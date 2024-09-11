import type { ILogger } from "src/core/logger";
import { Err, Ok } from "src/core/result";
import type { IVerifySms } from "./interface";

export type Config = {
  code: string;
  logger: ILogger;
  sleep: (ms: number) => Promise<unknown>;
};

export const VerifySms = (config: Config): IVerifySms => {
  let sendCodeCount = 0;
  let verifyCodeCount = 0;
  return {
    async sendCode(input) {
      sendCodeCount++;
      await config.sleep(100);
      config.logger.info(`Sending code ${config.code} to phone ${input.phone}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (sendCodeCount % 3 === 0) {
        config.logger.error(`Failed to send code to phone ${input.phone}`);
        return Err({
          t: "unknown",
          message: "Failed to send code",
        });
      }
      return Ok(null);
    },
    async verifyCode(input) {
      verifyCodeCount++;
      await config.sleep(100);
      config.logger.info(
        `Verifying code ${input.code} for phone ${input.phone}`,
      );
      if (input.code !== config.code) {
        config.logger.error(`Invalid code ${input.code}`);
        return Err({
          t: "wrong-code",
        });
      }

      if (verifyCodeCount % 3 === 0) {
        config.logger.error(`Failed to verify code ${input.code}`);
        return Err({
          t: "unknown",
          message: "Failed to verify code",
        });
      }

      return Ok(null);
    },
  };
};
