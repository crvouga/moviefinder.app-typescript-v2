type ResBase = {
  headers?: Record<string, string>;
};

type ResVariant =
  | {
      t: "html";
      html: string;
    }
  | {
      t: "redirect";
      to: string;
    }
  | {
      t: "empty";
    };

export type Res = ResVariant & ResBase;

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

export const empty = (): Res => {
  return {
    t: "empty",
  };
};

export const hxPushUrl = (res: Res, url: string): Res => {
  return {
    ...res,
    headers: {
      ...res.headers,
      "Hx-Push-Url": url,
      "Access-Control-Expose-Headers": "Hx-Push-Url",
    },
  };
};
