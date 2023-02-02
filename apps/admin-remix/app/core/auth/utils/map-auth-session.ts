import type { AuthSession } from "~/core/auth/session.server";
import type { SupabaseAuthSession } from "~/core/integrations/supabase/types";
import type { IUser } from "~/modules/user/queries";

export function mapAuthSession(
  supabaseAuthSession: SupabaseAuthSession | null,
  user: IUser | null
): AuthSession | null {
  if (!supabaseAuthSession) return null;

  return {
    access_token: supabaseAuthSession.access_token,
    refresh_token: supabaseAuthSession.refresh_token ?? "",
    userId: supabaseAuthSession.user?.id ?? "",
    email: supabaseAuthSession.user?.email ?? "",
    expiresIn: supabaseAuthSession.expires_in ?? -1,
    expiresAt: supabaseAuthSession.expires_at ?? -1,
    user: user,
  };
}
