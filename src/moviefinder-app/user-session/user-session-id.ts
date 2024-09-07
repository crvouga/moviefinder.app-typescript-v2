export type UserSessionId = string & { readonly brand: unique symbol };

const generate = (): UserSessionId => {
  return crypto.randomUUID() as UserSessionId;
};

export const UserSessionId = {
  generate,
};
