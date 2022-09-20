import { deleteAuthAccount } from "~/core/auth/mutations";
import type { AuthSession } from "~/core/auth/session.server";
import { db } from "~/core/database";

async function createUser({
  email,
  userId,
}: Pick<AuthSession, "userId" | "email">) {
  return db.user
    .create({
      data: {
        email,
        id: userId,
      },
    })
    .then((user) => user)
    .catch(() => null);
}

export async function tryCreateUser({
  email,
  userId,
}: Pick<AuthSession, "userId" | "email">) {
  const user = await createUser({
    userId,
    email,
  });

  // user account created and have a session but unable to store in User table
  // we should delete the user account to allow retry create account again
  if (!user) {
    await deleteAuthAccount(userId);
    return null;
  }

  return user;
}
