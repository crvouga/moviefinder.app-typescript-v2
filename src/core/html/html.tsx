export type Children =
  | number
  | string
  | boolean
  | null
  | undefined
  | bigint
  | Promise<Children>
  | Children[];

export const escape = (input: string): string => {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;");
};
