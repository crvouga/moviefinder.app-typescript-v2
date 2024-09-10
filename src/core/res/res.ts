export type Res =
  | {
      t: "html";
      html: string;
    }
  | {
      t: "redirect";
      to: string;
    };

export const html = (html: string): Res => {
  return {
    t: "html",
    html,
  };
};

export const redirect = (to: string): Res => {
  return {
    t: "redirect",
    to,
  };
};
