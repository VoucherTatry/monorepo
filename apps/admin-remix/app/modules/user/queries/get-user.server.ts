import type { Profile, User } from "@prisma/client";

import { db } from "~/core/database";

export interface IUser extends User {
  profile: Profile | null;
}

export async function getUserByEmail(
  email: User["email"]
): Promise<IUser | null> {
  return db.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { profile: true },
  });
}

export async function getUserById(id?: User["id"]): Promise<IUser | null> {
  if (!id) return null;

  return db.user.findUnique({
    where: { id },
    include: { profile: true },
  });
}
