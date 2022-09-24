import type { User } from "@supabase/supabase-js";

import { supabaseAdmin } from "~/core/integrations/supabase/supabase.server";
import type { SupabaseAuthSession } from "~/core/integrations/supabase/types";

export async function getAuthAccountByAccessToken(
  accessToken: SupabaseAuthSession["access_token"]
): Promise<User | null> {
  const { data, error } = await supabaseAdmin.auth.api.getUser(accessToken);

  if (!data || error) return null;

  return data;
}
