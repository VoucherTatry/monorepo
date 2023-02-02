import { redirect } from "@remix-run/node";
import { AuthError } from "@supabase/supabase-js";
import type { VerifyEmailOtpParams, Session } from "@supabase/supabase-js";

import { deleteAuthAccount } from "~/core/auth/mutations/delete-auth-account.server";
import { getSupabaseAdmin } from "~/core/integrations/supabase";
import { tryCreateUser } from "~/modules/user/mutations";
import type { IUser } from "~/modules/user/queries";
import { getUserById } from "~/modules/user/queries";
// import { SERVER_URL } from "~/utils/env";

const nullData = { user: null, session: null };

type AuthResponseWithUserAccount =
  | {
      data: {
        user: IUser | null;
        session: Session | null;
      };
      error: null;
    }
  | {
      data: {
        user: null;
        session: null;
      };
      error: AuthError;
    };

export async function sendMagicLink(
  email: string,
  shouldCreateUser = true
): Promise<AuthResponseWithUserAccount> {
  const response = await getSupabaseAdmin().auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser,

      // emailRedirectTo: `${SERVER_URL}/oauth/callback`,
    },
  });

  const { data, error } = response;

  console.log(response);

  if (error) {
    return { error, data };
  }

  if (!data.user) {
    return {
      data: nullData,
      error: new AuthError("Could not get nor create user!", 500),
    };
  }

  let userAccount = await getUserById(data.user.id);
  if (!userAccount) {
    userAccount = await tryCreateUser({
      email: data.user.email!,
      userId: data.user.id,
    });
  }

  if (!userAccount) {
    await deleteAuthAccount(data.user.id);

    return {
      data: nullData,
      error: new AuthError("Could not get nor create account for user!", 500),
    };
  }

  if (!data.user.confirmed_at) {
    throw redirect("/confirm-email");
  }

  return { data: { user: userAccount, session: null }, error: null };
}

export async function confirmEmailOtp({
  email,
  token,
  type,
}: VerifyEmailOtpParams) {
  return await getSupabaseAdmin().auth.verifyOtp({
    email,
    token,
    type,
  });
}
