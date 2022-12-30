import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireAuthSession } from "~/core/auth/guards";
import { WithSidebar } from "~/core/components/layouts/with-sidebar";
import { isAdmin } from "~/modules/user/helpers";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (!user || !isAdmin(user.role)) return redirect("/");

  return null;
};

export default function CategoriesPage() {
  return (
    <WithSidebar>
      <Outlet />
    </WithSidebar>
  );
}