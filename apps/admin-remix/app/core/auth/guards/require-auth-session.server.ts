import { assertAuthSession } from "~/core/auth/guards/assert-auth-session.server";
import { getAuthAccountByAccessToken } from "~/core/auth/queries/get-auth-account.server";
import { refreshAuthSession } from "~/core/auth/refresh-auth-session.server";
import type { AuthSession } from "~/core/auth/session.server";

const REFRESH_ACCESS_TOKEN_THRESHOLD = 60 * 10; // 10 minutes left before token expires

async function verifyAuthSession(authSession: AuthSession) {
  const authAccount = await getAuthAccountByAccessToken(
    authSession.access_token
  );

  return Boolean(authAccount);
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

  // damn, access token expires
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
