import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { WithSidebar } from "~/components/layouts/with-sidebar";
import { requireAuthSession } from "~/modules/auth";
import { getGaurdedPath } from "~/utils/getGuardedPath";
import { getCurrentPath } from "~/utils/http.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  const currentPath = getCurrentPath(request);
  const pathToRedirect = getGaurdedPath({ path: currentPath, user });
  if (pathToRedirect !== currentPath) {
    return redirect(pathToRedirect);
  }

  return { user };
};

export const meta: MetaFunction = () => ({
  title: "Strona główna",
});

export default function Index() {
  const { user } = useLoaderData();

  return (
    <WithSidebar>
      Hello {user?.profile?.organization ?? user?.email}
    </WithSidebar>
  );
}
