import { PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { LinkButton } from "ui";

import type { UserData } from "~/routes/users/$userId";

import { useMatchesData } from "~/core/hooks";

export default function User() {
  const userData = useMatchesData<UserData>("routes/users/$userId");
  const user = userData?.user;

  if (!user) {
    return <h2>Brak informacji o użytkowniku!</h2>;
  }

  if (!user.profile) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="flex flex-col text-3xl font-bold">
            <span>Konto użytkownika:</span>
            <span className="underline text-primary-500">{user?.email}</span>
          </h2>

          <LinkButton
            as={Link}
            to="new-profile"
            size="sm"
          >
            <PencilIcon className="h-5 w-5" />
            <span>Stwórz profil</span>
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex flex-col text-3xl font-bold">
          <span>Konto użytkownika:</span>
          <span className="underline text-primary-500">{user?.email}</span>
        </h2>

        <LinkButton
          as={Link}
          to="edit"
          size="sm"
        >
          <PencilIcon className="h-5 w-5" />
          <span>Edytuj</span>
        </LinkButton>
      </div>
      <div className="flex flex-col space-y-4">
        <h3 className="text-2xl font-semibold">
          Podstawowe informacje o użytkowniku:
        </h3>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <span className="text-sm text-stone-400 font-bold">
              Nazwa firmy:
            </span>
            <span>{user.profile.organization}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-stone-400 font-bold">Numer NIP:</span>
            <span>{user.profile.taxId}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-stone-400 font-bold">
              Numer telefonu:
            </span>
            <span>{user.profile.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
