export type SessionId = string & { readonly brand: unique symbol };

const generate = (): SessionId => {
  return crypto.randomUUID() as SessionId;
};

export const is = (sessionId: string): sessionId is SessionId => {
  return typeof sessionId === "string" && sessionId.length === 36;
};

export const SessionId = {
  generate,
  is,
};
