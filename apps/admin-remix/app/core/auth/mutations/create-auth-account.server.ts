import type { Session, User } from "@supabase/supabase-js";

import { supabaseAdmin } from "~/core/integrations/supabase/supabase.server";
import { SERVER_URL } from "~/core/utils/env.server";

export async function createAuthAccount(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.api.signUpWithEmail(
    email,
    password,
    { redirectTo: `${SERVER_URL}/oauth/callback` }
  );

  if (!data || error) return null;

  if (Object.keys(data).find((key) => key === "user"))
    return (data as Session).user;

  return data as User;
}
