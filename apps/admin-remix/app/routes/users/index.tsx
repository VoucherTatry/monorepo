import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { LinkButton, Table, Td, Th, THead, Tr } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import { isAdmin } from "~/modules/user/helpers";
import type { IUser } from "~/modules/user/queries";
import { getAllUsers } from "~/modules/user/queries/get-users.server";

type LoaderData = {
  users: IUser[];
};

export const loader: LoaderFunction = async () => {
  const users = await getAllUsers();

  return json<LoaderData>({ users });
};

export default function ProfileIndexPage() {
  const { users } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-8">
      <h2 className="text-3xl font-bold">Klienci</h2>

      <Table>
        <THead>
          <Th width="w-16">Status</Th>
          <Th>E-mail</Th>
          <Th>Imię</Th>
          <Th>Nazwisko</Th>
          <Th />
        </THead>
        <tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td className="flex justify-center w-16">
                {user.profile ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />
                )}
              </Td>
              <Td>
                <Link
                  to={user.id}
                  className="block w-max relative text-left font-bold text-stone-900 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-primary-500 before:transition group-hover:text-primary-500 group-hover:transition-colors group-hover:before:scale-x-100 group-hover:before:delay-200"
                >
                  {user.email}
                </Link>
              </Td>
              <Td>{user.profile?.firstName ?? "-"}</Td>
              <Td>{user.profile?.lastName ?? "-"}</Td>
              <Td className="text-right">
                <LinkButton
                  as={Link}
                  to={`/users/${user.id}/edit`}
                  size="sm"
                >
                  <PencilIcon className="h-5 w-5" />
                  <span>Edytuj</span>
                </LinkButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
