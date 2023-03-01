import { ProfileStatus } from "@prisma/client";
import { redirect } from "@remix-run/node";

import type { IUser } from "~/modules/user";

import { getCurrentPath } from "./http.server";

export function getGaurdedPath({
  path,
  user,
}: {
  path: string;
  user?: IUser | null;
}) {
  if (!user) {
    return "/auth";
  }

  if (!user.profile) {
    return "/profile/create";
  }

  if (user.profile?.status) {
    switch (user.profile.status) {
      case ProfileStatus.PENDING:
        return "/profile/review/pending";
      case ProfileStatus.REJECTED:
        return "/profile/review/rejected";
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

export function guardPath(request: Request, user?: IUser | null) {
  const currentPath = getCurrentPath(request);
  const pathToRedirect = getGaurdedPath({ path: "/", user });

  if (pathToRedirect !== currentPath) {
    throw redirect(pathToRedirect);
  }
}
