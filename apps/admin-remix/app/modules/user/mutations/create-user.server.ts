import type { AuthSession } from "~/modules/auth/types";
import type { IUser } from "~/modules/user/types";

import { db } from "~/database";
import { deleteAuthAccount } from "~/modules/auth/service.server";

async function createUser({
  email,
  userId,
}: Pick<AuthSession, "userId" | "email">): Promise<IUser | null> {
  return db.user
    .create({
      data: {
        email,
        id: userId,
      },
      include: {
        profile: true,
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
