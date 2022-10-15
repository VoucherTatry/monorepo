import { PencilIcon } from "@heroicons/react/24/outline";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { LinkButton } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import { useUserStore } from "~/modules/store";
import { isAdmin } from "~/modules/user/helpers";
import type { IUser } from "~/modules/user/queries";
import { getAllUsers } from "~/modules/user/queries/get-users.server";

type LoaderData = {
  users: IUser[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await requireAuthSession(request);

  if (!isAdmin(user?.role)) return redirect("/");

  const users = await getAllUsers();

  return json<LoaderData>({ users });
};

export default function ProfileIndexPage() {
  const activeUser = useUserStore((store) => store.user);
  const { users } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-8">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-end justify-between"
        >
          <h2
            className={
              "text-3xl " +
              (user.id === activeUser?.id ? "font-bold" : "font-medium")
            }
          >
            Profil użytkownika {user?.email}
          </h2>

          <LinkButton
            as={Link}
            to="/profile/edit"
            size="sm"
          >
            <PencilIcon className="h-5 w-5" />
            <span>Edytuj</span>
          </LinkButton>
        </div>
      ))}
    </div>
  );
}
