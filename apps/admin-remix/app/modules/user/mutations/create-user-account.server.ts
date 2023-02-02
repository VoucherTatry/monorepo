import { json, redirect } from "@remix-run/node";

import {
  createAuthAccount,
  deleteAuthAccount,
  signInWithEmail,
} from "~/core/auth/mutations";
import { tryCreateUser } from "~/modules/user/mutations";

export async function createUserAccount(email: string, password: string) {
  const {
    data: { user: authAccount },
    error,
  } = await createAuthAccount(email, password);

  if (error) {
    throw json(
      { errors: error },
      {
        status: error.status ?? 500,
      }
    );
  }

  // ok, no user account created
  if (!authAccount) return null;
  if (!!authAccount.confirmation_sent_at && !authAccount.email_confirmed_at) {
    throw redirect("/confirm-email");
  }

  const authSession = await signInWithEmail(email, password);

  // user account created but no session 😱
  // we should delete the user account to allow retry create account again
  if (!authSession) {
    await deleteAuthAccount(authAccount.id);
    return null;
  }

  const user = await tryCreateUser(authSession);

  if (!user) return null;

  return authSession;
}
