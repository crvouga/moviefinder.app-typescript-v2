export type GenreId = string & { readonly brand: unique symbol };

const generate = (): GenreId => {
  return crypto.randomUUID() as GenreId;
};

const init = (genreId: string | number): GenreId => {
  return String(genreId) as GenreId;
};

export const GenreId = {
  generate,
  init,
};
