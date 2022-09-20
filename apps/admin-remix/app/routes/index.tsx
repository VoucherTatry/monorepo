import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { requireAuthSession } from "~/core/auth/guards";

import { WithSidebar } from "~/core/components/layouts/with-sidebar";
import { useUserStore } from "~/modules/store";
import { getUserByEmail } from "~/modules/user/queries";

export const handle = {
  breadcrumb: () => {
    <NavLink to="/">Strona domowa</NavLink>;
  },
};

export const loader: LoaderFunction = async ({ request }) => {
  const { email } = await requireAuthSession(request);
  const user = await getUserByEmail(email);

  return json(user);
};

export const meta: MetaFunction = () => ({
  title: "Strona główna",
});

export default function Index() {
  const user = useUserStore((store) => store.user);

  return (
    <WithSidebar>Hello {user?.profile?.companyName ?? user?.email}</WithSidebar>
  );
}
