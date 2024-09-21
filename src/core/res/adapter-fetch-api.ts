import type { Res } from "./res";

export const toResponse = (res: Res): Response => {
  switch (res.t) {
    case "html": {
      return new Response(res.html, {
        headers: {
          "Content-Type": "text/html",
          ...res.headers,
        },
      });
    }

    case "redirect": {
      return new Response(null, {
        status: 302,
        headers: {
          Location: res.to,
          ...res.headers,
        },
      });
    }

    case "empty": {
      return new Response(null, {
        status: 204,
        headers: res.headers,
      });
    }
  }
};
