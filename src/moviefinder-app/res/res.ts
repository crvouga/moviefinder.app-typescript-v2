export type Res =
  | {
      type: "html";
      html: string;
    }
  | {
      type: "redirect";
      to: string;
    };

export const html = (html: string): Res => {
  return {
    type: "html",
    html,
  };
};

export const redirect = (to: string): Res => {
  return {
    type: "redirect",
    to,
  };
};
