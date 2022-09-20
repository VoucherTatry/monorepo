import { redirect } from "@remix-run/node";

import {
  createAuthAccount,
  deleteAuthAccount,
  signInWithEmail,
} from "~/core/auth/mutations";
import type { AuthSession } from "~/core/auth/session.server";
import { db } from "~/core/database";
import { tryCreateUser } from "~/modules/user/mutations";

export async function createUserAccount(
  email: string,
  password: string
): Promise<AuthSession | null> {
  const authAccount = await createAuthAccount(email, password);

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

  let user = await db.user.findUnique({ where: { email } });
  if (!user) {
    user = await tryCreateUser(authSession);
  }

  if (!user) return null;

  return authSession;
}
