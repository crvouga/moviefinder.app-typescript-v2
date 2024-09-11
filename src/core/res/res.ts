export type Res =
  | {
      t: "html";
      html: string;
    }
  | {
      t: "redirect";
      to: string;
    };

export const html = async (html: string | Promise<string>): Promise<Res> => {
  return {
    t: "html",
    html: await html,
  };
};

export const redirect = (to: string): Res => {
  return {
    t: "redirect",
    to,
  };
};
