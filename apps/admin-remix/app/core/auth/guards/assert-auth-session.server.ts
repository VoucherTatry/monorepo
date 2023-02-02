import { redirect } from "@remix-run/node";

import { LOGIN_URL } from "../const";
import { commitAuthSession, getAuthSession } from "../session.server";
import { makeRedirectToFromHere } from "~/utils/http.server";

export async function assertAuthSession(
  request: Request,
  { onFailRedirectTo }: { onFailRedirectTo?: string } = {}
) {
  const authSession = await getAuthSession(request);

  // If there is no user session, Fly, You Fools! 🧙‍♂️
  if (!authSession?.access_token || !authSession?.refresh_token) {
    let redirectUrl = onFailRedirectTo ?? LOGIN_URL;

    const prevPath = makeRedirectToFromHere(request);
    if (prevPath) {
      redirectUrl = `${redirectUrl}?${prevPath}`;
    }

    throw redirect(redirectUrl, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: null,
          flashErrorMessage: "no-user-session",
        }),
      },
    });
  }

  return authSession;
}
