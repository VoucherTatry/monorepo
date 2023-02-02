import { redirect } from "@remix-run/node";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { WithSidebar } from "~/components/layouts/with-sidebar";
import { requireAuthSession } from "~/core/auth/guards";
import { useAppData } from "~/core/hooks/use-app-data";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (user && !user.profile) {
    return redirect(`/users/${user.id}/new-profile`);
  }

  return null;
};

export const meta: MetaFunction = () => ({
  title: "Strona główna",
});

export default function Index() {
  const { user } = useAppData();

  return (
    <WithSidebar>Hello {user?.profile?.companyName ?? user?.email}</WithSidebar>
  );
}
