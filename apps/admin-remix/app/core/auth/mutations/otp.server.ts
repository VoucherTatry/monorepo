import { AuthError } from "@supabase/supabase-js";
import type {
  VerifyEmailOtpParams,
  Session,
  AuthResponse,
} from "@supabase/supabase-js";

import { deleteAuthAccount } from "~/core/auth/mutations/delete-auth-account.server";
import { getSupabaseAdmin } from "~/core/integrations/supabase";
import { tryCreateUser } from "~/modules/user/mutations";
import type { IUser } from "~/modules/user/queries";
import { getUserById } from "~/modules/user/queries";

const nullData = { user: null, session: null };

type AuthSuccessResponse = {
  data: {
    user: IUser;
    session: Session;
  };
  error: null;
};

type AuthErrorResponse = {
  data: {
    user: null;
    session: null;
  };
  error: AuthError;
};

type AuthResponseWithUserAccount = AuthSuccessResponse | AuthErrorResponse;

export async function sendMagicLink(email: string): Promise<AuthResponse> {
  return await getSupabaseAdmin().auth.signInWithOtp({
    email,
  });
}

export async function confirmEmailOtp({
  email,
  token,
  type,
}: VerifyEmailOtpParams): Promise<AuthResponseWithUserAccount> {
  const { data, error } = await getSupabaseAdmin().auth.verifyOtp({
    email,
    token,
    type,
  });

  if (error) {
    return { error, data };
  }

  if (!data.user) {
    return {
      data: nullData,
      error: new AuthError("Could not get nor create user!", 500),
    };
  }

  if (!data.session) {
    return {
      data: nullData,
      error: new AuthError("Could not get session!", 500),
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

  return {
    data: { session: data.session, user: userAccount },
    error,
  };
}
