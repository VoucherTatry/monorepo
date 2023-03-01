import type { AuthSession } from "~/modules/auth/types";

import { getSupabaseAdmin } from "~/integrations/supabase";
import { mapAuthSession } from "~/modules/auth/mappers";

export async function getAuthAccountByAccessToken(accessToken: string) {
  const { data, error } = await getSupabaseAdmin().auth.getUser(accessToken);

  if (!data.user || error) return null;

  return data.user;
}

export async function createAuthAccount(email: string, password: string) {
  return await getSupabaseAdmin().auth.admin.createUser({
    email,
    password,
  });
}

export async function deleteAuthAccount(userId: string) {
  const { error } = await getSupabaseAdmin().auth.admin.deleteUser(userId);

  if (error) {
    return null;
  }

  return true;
}

export async function refreshAccessToken(
  refresh_token?: string
): Promise<AuthSession | null> {
  if (!refresh_token) return null;

  const { data, error } = await getSupabaseAdmin().auth.refreshSession({
    refresh_token,
  });

  if (!data.session || error) return null;

  return await mapAuthSession(data.session);
}

export async function verifyAuthSession(authSession: AuthSession) {
  const authAccount = await getAuthAccountByAccessToken(
    authSession.access_token
  );

  return Boolean(authAccount);
}
