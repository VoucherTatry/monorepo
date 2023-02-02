import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { getSupabaseAdmin } from "~/core/integrations/supabase/supabase";
import { getUserById } from "~/modules/user/queries";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await getSupabaseAdmin().auth.signInWithPassword({
    email,
    password,
  });

  if (!data.session || error) return null;

  const user = await getUserById(data.user?.id);

  return mapAuthSession(data.session, user);
}
