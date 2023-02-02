import { redirect } from "@remix-run/node";

import { LOGIN_URL } from "~/core/auth/const";
import type { AuthSession } from "~/core/auth/session.server";
import { getAuthSession, commitAuthSession } from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { getSupabaseAdmin } from "~/core/integrations/supabase/supabase";
import { getUserById } from "~/modules/user/queries";
import {
  getCurrentPath,
  isGet,
  makeRedirectToFromHere,
} from "~/utils/http.server";

export async function refreshAccessToken(
  refresh_token?: string
): Promise<AuthSession | null> {
  if (!refresh_token) return null;

  const { data, error } = await getSupabaseAdmin().auth.refreshSession({
    refresh_token,
  });

  if (!data.session || error) return null;

  const user = await getUserById(data.user?.id);

  return mapAuthSession(data.session, user);
}

export async function refreshAuthSession(
  request: Request
): Promise<AuthSession> {
  const authSession = await getAuthSession(request);

  const refreshedAuthSession = await refreshAccessToken(
    authSession?.refresh_token
  );

  // 👾 game over, log in again
  // yes, arbitrary, but it's a good way to don't let an illegal user here with an expired token
  if (!refreshedAuthSession) {
    let redirectUrl = `${LOGIN_URL}`;

    const prevPath = makeRedirectToFromHere(request);
    if (prevPath) {
      redirectUrl = `${redirectUrl}?${prevPath}`;
    }

    // here we throw instead of return because this function promise a AuthSession and not a response object
    // https://remix.run/docs/en/v1/guides/constraints#higher-order-functions
    throw redirect(redirectUrl, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: null,
          flashErrorMessage: "fail-refresh-auth-session",
        }),
      },
    });
  }

  // refresh is ok and we can redirect
  if (isGet(request)) {
    // here we throw instead of return because this function promise a UserSession and not a response object
    // https://remix.run/docs/en/v1/guides/constraints#higher-order-functions
    throw redirect(getCurrentPath(request), {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: refreshedAuthSession,
        }),
      },
    });
  }

  // we can't redirect because we are in an action, so, deal with it and don't forget to handle session commit 👮‍♀️
  return refreshedAuthSession;
}
