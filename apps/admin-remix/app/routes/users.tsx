import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireAuthSession } from "~/core/auth/guards";

import { WithSidebar } from "~/core/components/layouts/with-sidebar";
import { isAdmin } from "~/modules/user/helpers";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (!user) return redirect("/");

  const isUserProfile = new URL(request.url).pathname.startsWith(
    `/users/${user.id}`
  );
  if (!isAdmin(user.role) && !isUserProfile) return redirect(user.id);

  return null;
};

export default function ProfilePage() {
  return (
    <WithSidebar>
      <Outlet />
    </WithSidebar>
  );
}
