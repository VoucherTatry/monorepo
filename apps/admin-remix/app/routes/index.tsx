import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";

import { requireAuthSession } from "~/core/auth/guards";
import { WithSidebar } from "~/core/components/layouts/with-sidebar";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import type { IUser } from "~/modules/user/queries";

export const handle = {
  breadcrumb: () => {
    <NavLink to="/">Strona domowa</NavLink>;
  },
};

type LoaderData = { user: IUser | null };

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  return json<LoaderData>({ user });
};

export const meta: MetaFunction = () => ({
  title: "Strona główna",
});

export default function Index() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <WithSidebar>Hello {user?.profile?.companyName ?? user?.email}</WithSidebar>
  );
}
