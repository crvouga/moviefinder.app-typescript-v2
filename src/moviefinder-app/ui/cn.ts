import { twMerge } from "tailwind-merge";

type Val = string | undefined | null | boolean | number | Val[];

export const cn = (...classNames: Val[]): string => {
  return twMerge(classNames.filter(Boolean).join(" "));
};
