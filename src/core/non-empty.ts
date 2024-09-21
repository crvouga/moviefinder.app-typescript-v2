export type NonEmpty<T> = [T, ...T[]];

const init = <T>(first: T, ...rest: T[]): NonEmpty<T> => {
  return [first, ...rest];
};

const is = <T>(input: T[]): input is NonEmpty<T> => {
  return input.length > 0;
};

const first = <T>(input: NonEmpty<T>): T => {
  return input[0];
};

const last = <T>(input: NonEmpty<T>): T => {
  return input[input.length - 1] as T;
};

export const NonEmpty = {
  init,
  is,
  first,
  last,
};
