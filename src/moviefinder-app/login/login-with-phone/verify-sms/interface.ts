import type { Result } from "src/core/result";

export type VerifyCodeError =
  | {
      type: "wrong-code";
    }
  | {
      type: "unknown";
      message: string;
    };

export type SendCodeError = {
  type: "unknown";
  message: string;
};

export type IVerifySms = {
  sendCode: (input: { phone: string }) => Promise<Result<SendCodeError, null>>;
  verifyCode: (input: {
    phone: string;
    code: string;
  }) => Promise<Result<VerifyCodeError, null>>;
};
