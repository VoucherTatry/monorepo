import { redirect } from "@remix-run/node";

import { LOGIN_URL } from "../const";
import { commitAuthSession, getAuthSession } from "../session.server";
import { makeRedirectToFromHere } from "~/core/utils/http.server";

export async function assertAuthSession(
  request: Request,
  { onFailRedirectTo }: { onFailRedirectTo?: string } = {}
) {
  const authSession = await getAuthSession(request);

  // If there is no user session, Fly, You Fools! 🧙‍♂️
  if (!authSession?.accessToken || !authSession?.refreshToken) {
    throw redirect(
      `${onFailRedirectTo || LOGIN_URL}?${makeRedirectToFromHere(request)}`,
      {
        headers: {
          "Set-Cookie": await commitAuthSession(request, {
            authSession: null,
            flashErrorMessage: "no-user-session",
          }),
        },
      }
    );
  }

  return authSession;
}
