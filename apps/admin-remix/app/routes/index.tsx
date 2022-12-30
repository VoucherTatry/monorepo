import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";

import { requireAuthSession } from "~/core/auth/guards";
import { WithSidebar } from "~/core/components/layouts/with-sidebar";
import useAppData from "~/core/hooks/use-app-data";

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (user && !user.profile) {
    return redirect(`/users/${user.id}/edit`);
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
