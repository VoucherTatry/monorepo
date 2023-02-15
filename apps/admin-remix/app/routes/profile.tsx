import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { AuthWrapper } from "~/components/layouts/auth-wrapper";
import { requireAuthSession } from "~/core/auth/guards";
import { getGaurdedPath } from "~/utils/getGuardedPath";
import { getCurrentPath } from "~/utils/http.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  const currentPath = getCurrentPath(request);
  const pathToRedirect = getGaurdedPath({ path: currentPath, user });

  if (pathToRedirect !== currentPath) {
    return redirect(pathToRedirect);
  }

  return null;
};

export default function CreateProfile() {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}
