import { supabaseAdmin } from "~/core/integrations/supabase/supabase.server";
import { SERVER_URL } from "~/core/utils/env.server";

export async function createAuthAccount(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${SERVER_URL}/oauth/callback`,
    },
  });

  if (!data.session || !data.user || error) return null;

  if (data.session) return data.session.user;

  return data.user;
}
