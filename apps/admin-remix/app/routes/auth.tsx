import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { AuthWrapper } from "~/components/layouts/auth-wrapper";
import { getAuthSession } from "~/core/auth/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  if (authSession) return redirect("/");

  return json({});
};

export const meta: MetaFunction = () => ({
  title: "Strona powitalna",
});

export default function AuthPage() {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}
