import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireAuthSession } from "~/core/auth/guards";

import { WithSidebar } from "~/core/components/layouts/with-sidebar";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (user && !user.profile) {
    return redirect(`/users/${user.id}/edit`);
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
