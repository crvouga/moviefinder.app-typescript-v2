import type { Req } from "./req";
import { SessionId } from "./session-id";

export const fromRequest = async (
  request: Request,
  sessionId: SessionId,
): Promise<Req> => {
  const formDateMap: { [key: string]: unknown } = {};
  if (request.method === "POST") {
    const formData = await request.formData();

    for (const [key, value] of formData.entries()) {
      formDateMap[key] = value;
    }
  }

  return {
    sessionId,
    formData: formDateMap,
  };
};

const toCookies = (request: Request): { [key: string]: string } => {
  return Object.fromEntries(
    request.headers
      .get("cookie")
      ?.split(";")
      .map((cookie) => cookie.split("=").map((x) => x.trim())) ?? [],
  );
};

export const wrapSessionId =
  (input: {
    cookieName: string;
    fetch: (input: {
      sessionId: SessionId;
      request: Request;
    }) => Promise<Response>;
  }) =>
  async (request: Request): Promise<Response> => {
    const cookies = toCookies(request);

    const sessionIdCookieValue = cookies[input.cookieName];
    const maybeSessionId =
      sessionIdCookieValue && SessionId.is(sessionIdCookieValue)
        ? sessionIdCookieValue
        : null;
    const sessionId = maybeSessionId ?? SessionId.generate();
    const response = await input.fetch({ sessionId, request });
    if (!maybeSessionId) {
      response.headers.append(
        "Set-Cookie",
        `${input.cookieName}=${sessionId}; SameSite=Strict; HttpOnly; Path=/; Secure; Max-Age=31536000;`,
      );
    }
    return response;
  };
