import { Role } from "@prisma/client";

import type { IUser } from "./queries";

export function isAdmin(role?: Role) {
  if (!role) return false;
  return [Role.ADMIN, Role.SUPER_ADMIN].some((adminType) => role === adminType);
}

export function getUserDisplayName(user: IUser) {
  if (user.profile?.companyName) {
    return user.profile?.companyName;
  }

  if (user.profile?.firstName && user.profile?.lastName) {
    return `${user.profile?.firstName} ${user.profile?.lastName}`;
  }

  return user.email;
}
