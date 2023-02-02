import { getSupabaseAdmin } from "~/core/integrations/supabase";

export async function deleteAuthAccount(userId: string) {
  return await getSupabaseAdmin().auth.admin.deleteUser(userId);
}
