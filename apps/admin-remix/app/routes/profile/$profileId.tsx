import { useEffect } from "react";

import { PencilIcon } from "@heroicons/react/24/outline";
import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import invariant from "tiny-invariant";
import { LinkButton } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import { useUserStore } from "~/modules/store";
import type { TUser } from "~/modules/user/queries";
import { getUserById } from "~/modules/user/queries";

// export const handle = {
//   breadcrumb: () => {
//     <NavLink to="/campaigns">Kampanie</NavLink>;
//   },
// };

type LoaderData = {
  currentUserId: string;
  user: TUser;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = await requireAuthSession(request);
  invariant(params.profileId, "profileId not found");

  const user = await getUserById(userId);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ currentUserId: userId, user });
};

export default function ProfileIndexPage() {
  const { currentUserId, user } = useLoaderData<LoaderData>();
  const setUser = useUserStore((store) => store.setUser);

  useEffect(() => {
    if (user.id === currentUserId) setUser(user);
  }, [currentUserId, user, setUser]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-8">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl">Profil użytkownika {user?.email}</h2>

        <LinkButton
          as={Link}
          to="/profile/edit"
          size="sm"
        >
          <PencilIcon className="h-5 w-5" />
          <span>Edytuj</span>
        </LinkButton>
      </div>
      {JSON.stringify(user)}
    </div>
  );
}
