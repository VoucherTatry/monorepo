import { PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { LinkButton } from "ui";
import { useMatchesData } from "~/core/hooks";
import { UserData } from "~/routes/users/$userId";

export default function User() {
  const userData = useMatchesData<UserData>("routes/users/$userId");
  const user = userData?.user;

  return (
    <>
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">Konto użytkownika {user?.email}</h2>

        <LinkButton
          as={Link}
          to="edit"
          size="sm"
        >
          <PencilIcon className="h-5 w-5" />
          <span>Edytuj</span>
        </LinkButton>
      </div>
      {JSON.stringify(user)}
    </>
  );
}
