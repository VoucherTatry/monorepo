import type { User } from "@supabase/supabase-js";

import { getSupabaseAdmin } from "~/core/integrations/supabase/supabase";
import type * as types from "~/core/integrations/supabase/types";

export async function getAuthAccountByAccessToken(
  accessToken: types.SupabaseAuthSession["access_token"]
): Promise<User | null> {
  const { data, error } = await getSupabaseAdmin().auth.getUser(accessToken);

  if (!data || error) return null;

  return data.user;
}
