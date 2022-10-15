import { mapAuthSession } from "../utils/map-auth-session";
import { supabaseAdmin } from "~/core/integrations/supabase/supabase.server";
import { SERVER_URL } from "~/core/utils/env.server";
import { getUserById } from "~/modules/user/queries";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (!data || error) return null;

  const user = await getUserById(data.user?.id);

  return mapAuthSession(data.session, user);
}

export async function sendMagicLink(email: string) {
  return supabaseAdmin.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${SERVER_URL}/oauth/callback`,
    },
  });
}
