import type { IUser } from "~/modules/user/types";

import { db } from "~/database";

export async function getAllUsers(): Promise<IUser[]> {
  return db.user.findMany({ include: { profile: true } });
}
