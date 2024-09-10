import type { Result } from "src/core/result";

export type VerifyCodeError =
  | {
      t: "wrong-code";
    }
  | {
      t: "unknown";
      message: string;
    };

export type SendCodeError = {
  t: "unknown";
  message: string;
};

export type IVerifySms = {
  sendCode: (input: { phone: string }) => Promise<Result<SendCodeError, null>>;
  verifyCode: (input: {
    phone: string;
    code: string;
  }) => Promise<Result<VerifyCodeError, null>>;
};
