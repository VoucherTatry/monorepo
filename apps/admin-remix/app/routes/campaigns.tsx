import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { WithSidebar } from "~/components/layouts/with-sidebar";
import { requireAuthSession } from "~/core/auth/guards";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (user && !user.profile) {
    return redirect(`/users/${user.id}/new-profile`);
  }

  return null;
};

export default function CampaignsPage() {
  return (
    <WithSidebar>
      <Outlet />
    </WithSidebar>
  );
}
