import { Outlet } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { LoaderFunction } from "@remix-run/node";
import type { IUser } from "~/modules/user";

import { requireAuthSession } from "~/modules/auth";
import { getUserById } from "~/modules/user/queries";
import { json } from "~/utils/superjson-remix";

export type UserData = {
  user: IUser;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireAuthSession(request);

  invariant(params.userId, "userId not found");

  const user = await getUserById(params.userId);

  if (!user) {
    throw new Response("Nie znaleziono użytkownika!", { status: 404 });
  }
  return json<UserData>({ user });
};

export default function UserIndexPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-8">
      <Outlet />
    </div>
  );
}
