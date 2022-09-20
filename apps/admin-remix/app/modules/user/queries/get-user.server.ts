import { Profile, User } from "@prisma/client";
import { db } from "~/core/database";

export type TUser = User & { profile: Profile | null };

export async function getUserByEmail(
  email: User["email"]
): Promise<TUser | null> {
  return db.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { profile: true },
  });
}

export async function getUserById(id: User["id"]): Promise<TUser | null> {
  return db.user.findUnique({
    where: { id },
    include: { profile: true },
  });
}
