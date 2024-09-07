export type UserId = string & { readonly brand: unique symbol };

const generate = (): UserId => {
  return crypto.randomUUID() as UserId;
};

export const UserId = {
  generate,
};
