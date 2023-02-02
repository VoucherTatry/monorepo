import { createCookieSessionStorage, redirect } from "@remix-run/node";

import {
  SESSION_ERROR_KEY,
  SESSION_KEY_AUTH,
  SESSION_MAX_AGE,
} from "~/core/auth/const";
import type { IUser } from "~/modules/user/queries";
import { NODE_ENV, SESSION_SECRET } from "~/utils/env";
import { safeRedirect } from "~/utils/http.server";

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not set");
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
  expiresAt: number;
  userId: string;
  email: string;
  user: IUser | null;
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
    maxAge: 0,
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
