import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { WithSidebar } from "~/components/layouts/with-sidebar";
import { requireAuthSession } from "~/core/auth/guards";
import { isAdmin } from "~/modules/user/helpers";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (!user) return redirect("/");

  const isUserProfilePage = new URL(request.url).pathname.startsWith(
    `/users/${user.id}`
  );
  if (!isAdmin(user.role) && !isUserProfilePage) return redirect(user.id);

  if (!user.profile && !isUserProfilePage) {
    return redirect(`/users/${user.id}/new-profile`);
  }

  return null;
};

export default function ProfilePage() {
  return (
    <WithSidebar>
      <Outlet />
    </WithSidebar>
  );
}
