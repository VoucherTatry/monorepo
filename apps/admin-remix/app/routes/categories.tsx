import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { WithSidebar } from "~/components/layouts/with-sidebar";
import { requireAuthSession } from "~/modules/auth";
import { isAdmin } from "~/modules/user/helpers";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (!user || !isAdmin(user.role)) return redirect("/");

  if (!user.profile) {
    return redirect(`/users/${user.id}/new-profile`);
  }

  return null;
};

export default function CategoriesPage() {
  return (
    <WithSidebar>
      <Outlet />
    </WithSidebar>
  );
}
