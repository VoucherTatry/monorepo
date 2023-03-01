import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { AuthWrapper } from "~/modules/auth/components/auth-wrapper";
import { getAuthSession } from "~/modules/auth/session.server";

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
