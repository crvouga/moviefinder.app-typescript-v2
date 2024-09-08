export type FeedId = string & { readonly brand: unique symbol };

const generate = (): FeedId => {
  return crypto.randomUUID() as FeedId;
};

export const FeedId = {
  generate,
};
