import { supabaseAdmin } from "~/core/integrations/supabase/supabase.server";

export async function deleteAuthAccount(userId: string) {
  return supabaseAdmin.auth.admin.deleteUser(userId);
}
