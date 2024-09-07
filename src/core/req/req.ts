import type { SessionId } from "./session-id";

export type Req = {
  formData: { [key: string]: unknown };
  sessionId: SessionId;
};
