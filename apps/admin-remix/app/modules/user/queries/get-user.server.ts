import type { User } from "@prisma/client";
import type { IUser } from "~/modules/user/types";

import { db } from "~/database";

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
