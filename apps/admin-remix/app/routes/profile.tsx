import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { assertAuthSession } from "~/modules/auth";
import { AuthWrapper } from "~/modules/auth/components/auth-wrapper";
import { guardPath } from "~/utils/getGuardedPath";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await assertAuthSession(request);
  const user = authSession.user;

  guardPath(request, user);

  return json({});
};

export default function CreateProfile() {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}
