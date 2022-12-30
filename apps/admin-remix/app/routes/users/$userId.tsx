import { useEffect } from "react";

import { PencilIcon } from "@heroicons/react/24/outline";
import type { LoaderFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import invariant from "tiny-invariant";
import { LinkButton } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import type { IUser } from "~/modules/user/queries";
import { getUserById } from "~/modules/user/queries";

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
