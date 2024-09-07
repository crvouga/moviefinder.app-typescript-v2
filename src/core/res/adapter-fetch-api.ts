import type { Res } from "./res";

export const toResponse = (res: Res): Response => {
  switch (res.type) {
    case "html": {
      return new Response(res.html, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    case "redirect": {
      return new Response(null, {
        status: 302,
        headers: {
          Location: res.to,
        },
      });
    }
  }
};
