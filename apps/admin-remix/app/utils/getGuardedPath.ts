import { ProfileStatus } from "@prisma/client";

import type { IUser } from "~/modules/user/queries";

export function getGaurdedPath({
  path,
  user,
}: {
  path: string;
  user?: IUser | null;
}) {
  console.log({ path, user, profile: user?.profile });
  if (!user) {
    return "/auth";
  }

  if (!user.profile) {
    return "/profile/create";
  }

  if (user.profile?.status) {
    switch (user.profile.status) {
      case ProfileStatus.PENDING:
        return "/profile/review-pending";
      case ProfileStatus.REJECTED:
        return "/prfile/review-rejected";
      case ProfileStatus.ACTIVE:
      default:
        if (path.startsWith("/profile")) {
          return "/";
        }
        return path;
    }
  }

  return path;
}
