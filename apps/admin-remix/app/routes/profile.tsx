import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { AuthWrapper } from "~/components/layouts/auth-wrapper";
import { assertAuthSession } from "~/core/auth/guards/assert-auth-session.server";
import {
  commitAuthSession,
  destroyAuthSession,
} from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { getUserById } from "~/modules/user/queries";
import { guardPath } from "~/utils/getGuardedPath";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await assertAuthSession(request);

  const user = await getUserById(authSession.userId);

  if (!user) {
    destroyAuthSession(request);
    return redirect("/");
  }

  guardPath(request, user);

  const updatedSession = mapAuthSession(authSession, user);
  return commitAuthSession(request, { authSession: updatedSession });
};

export default function CreateProfile() {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}
