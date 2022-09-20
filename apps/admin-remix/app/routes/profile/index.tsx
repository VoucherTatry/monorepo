import { PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { LinkButton } from "ui";

import { useUserStore } from "~/modules/store";

// export const handle = {
//   breadcrumb: () => {
//     <NavLink to="/campaigns">Kampanie</NavLink>;
//   },
// };

export default function ProfileIndexPage() {
  const user = useUserStore((store) => store.user);

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
