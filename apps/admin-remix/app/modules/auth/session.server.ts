import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { z } from "zod";

import type { AuthSession } from "~/modules/auth/types";

import {
  LOGIN_URL,
  REFRESH_ACCESS_TOKEN_THRESHOLD,
  SESSION_ERROR_KEY,
  SESSION_KEY_AUTH,
  SESSION_KEY_OTP_EMAIL,
  SESSION_MAX_AGE,
} from "~/modules/auth/const";
import {
  refreshAccessToken,
  verifyAuthSession,
} from "~/modules/auth/service.server";
import { NODE_ENV, SESSION_SECRET } from "~/utils/env";
import {
  getCurrentPath,
  isGet,
  makeRedirectToFromHere,
  safeRedirect,
} from "~/utils/http.server";

const EmailSchema = z
  .string()
  .email("Nieprawidłowy adres email")
  .transform((email) => email.toLowerCase());

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not set");
}

export type RealtimeAuthSession = Pick<
  AuthSession,
  "access_token" | "expiresIn" | "expiresAt"
>;

/**
 * Session storage CRUD
 */

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [SESSION_SECRET],
    secure: NODE_ENV === "production",
  },
});

export const { getSession: rawGetSession, commitSession } = sessionStorage;

export async function createAuthSession({
  request,
  authSession,
  redirectTo,
}: {
  request: Request;
  authSession: AuthSession;
  redirectTo: string;
}) {
  return redirect(safeRedirect(redirectTo), {
    headers: {
      "Set-Cookie": await commitAuthSession(request, {
        authSession,
        flashErrorMessage: null,
      }),
    },
  });
}

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getAuthSession(
  request: Request
): Promise<AuthSession | null> {
  const session = await getSession(request);
  return session.get(SESSION_KEY_AUTH);
}

export async function commitAuthSession(
  request: Request,
  {
    authSession,
    flashErrorMessage,
  }: {
    authSession?: AuthSession | null;
    flashErrorMessage?: string | null;
  } = {}
) {
  const session = await getSession(request);

  // allow user session to be null.
  // useful you want to clear session and display a message explaining why
  if (authSession !== undefined) {
    session.set(SESSION_KEY_AUTH, authSession);
  }

  session.flash(SESSION_ERROR_KEY, flashErrorMessage);

  return sessionStorage.commitSession(session, { maxAge: SESSION_MAX_AGE });
}

export async function destroyAuthSession(request: Request) {
  const session = await getSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function hasValidSessionOTPEmail(request: Request) {
  const session = await getSession(request);
  const validateSessionOTPEmail = await EmailSchema.safeParseAsync(
    session.get(SESSION_KEY_OTP_EMAIL)
  );

  return validateSessionOTPEmail.success;
}

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

/**
 * Assert auth session is present and verified from supabase auth api
 *
 * If used in loader (GET method)
 * - Refresh tokens if session is expired
 * - Return auth session if not expired
 * - Destroy session if refresh token is expired
 *
 * If used in action (POST method)
 * - Try to refresh session if expired and return this new session (it's your job to handle session commit)
 * - Return auth session if not expired
 * - Destroy session if refresh token is expired
 */
export async function requireAuthSession(
  request: Request,
  {
    onFailRedirectTo,
    verify,
  }: { onFailRedirectTo?: string; verify: boolean } = { verify: false }
): Promise<AuthSession> {
  const authSession = await assertAuthSession(request, {
    onFailRedirectTo,
  });

  // ok, let's challenge its access token
  // by default, we don't verify the access token from supabase auth api to save some time
  const isValidSession = verify ? await verifyAuthSession(authSession) : true;

  // damn, access token is not valid or expires soon
  // let's try to refresh, in case of 🧐
  if (!isValidSession || isExpiringSoon(authSession.expiresAt)) {
    return refreshAuthSession(request);
  }

  // finally, we have a valid session, let's return it
  return authSession;
}

function isExpiringSoon(expiresAt: number) {
  return (expiresAt - REFRESH_ACCESS_TOKEN_THRESHOLD) * 1000 < Date.now();
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
