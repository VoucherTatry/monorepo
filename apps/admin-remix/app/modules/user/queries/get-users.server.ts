import type { IUser } from "./get-user.server";
import { db } from "~/core/database";

export async function getAllUsers(): Promise<IUser[]> {
  return db.user.findMany({ include: { profile: true } });
}
