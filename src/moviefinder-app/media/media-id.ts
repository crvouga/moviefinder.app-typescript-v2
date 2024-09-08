export type MediaId = string & { readonly brand: unique symbol };

const generate = (): MediaId => {
  return crypto.randomUUID() as MediaId;
};

const init = (maybeId: string | number): MediaId => {
  return String(maybeId) as MediaId;
};

export const MediaId = {
  generate,
  init,
};
