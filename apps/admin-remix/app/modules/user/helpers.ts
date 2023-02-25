import { Role } from "@prisma/client";

import type { IUser } from "./queries";

export function isAdmin(role?: Role) {
  if (!role) return false;
  return [Role.ADMIN, Role.SUPER_ADMIN].some((adminType) => role === adminType);
}

export function getUserDisplayName(user: IUser) {
  if (user.profile?.organization) {
    return user.profile?.organization;
  }

  return user.email;
}
