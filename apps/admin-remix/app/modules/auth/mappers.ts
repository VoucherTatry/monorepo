import type { SupabaseAuthSession } from "~/integrations/supabase/types";
import type { AuthSession } from "~/modules/auth/types";

import { getUserById } from "~/modules/user/queries";

export async function mapAuthSession(
  supabaseAuthSession: SupabaseAuthSession | AuthSession | null
): Promise<AuthSession | null> {
  if (!supabaseAuthSession) return null;

  if (!supabaseAuthSession.refresh_token) {
    throw new Error("User should have a refresh token");
  }

  if (!supabaseAuthSession.user?.email || !supabaseAuthSession.user?.id) {
    throw new Error("User should have an id and email");
  }

  const user = await getUserById(supabaseAuthSession.user.id);

  if (!user) {
    throw new Error("There is no user for session id!");
  }

  return {
    token_type: supabaseAuthSession.token_type,
    access_token: supabaseAuthSession.access_token,
    refresh_token: supabaseAuthSession.refresh_token ?? "",
    userId: supabaseAuthSession.user?.id ?? "",
    email: supabaseAuthSession.user?.email ?? "",
    expiresIn: supabaseAuthSession.expires_in ?? -1,
    expiresAt: supabaseAuthSession.expires_at ?? -1,
    expires_in: supabaseAuthSession.expires_in,
    expires_at: supabaseAuthSession.expires_at,
    user,
  };
}
