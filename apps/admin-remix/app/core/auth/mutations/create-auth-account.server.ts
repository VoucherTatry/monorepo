import { getSupabaseAdmin } from "~/core/integrations/supabase/supabase";

export async function createAuthAccount(email: string, password: string) {
  return await getSupabaseAdmin().auth.admin.createUser({
    email,
    password,
  });
}
