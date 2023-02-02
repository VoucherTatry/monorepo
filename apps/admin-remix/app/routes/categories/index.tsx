import { FolderPlusIcon } from "@heroicons/react/24/outline";
import type { Category } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { LinkButton } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { json, useLoaderData } from "~/utils/superjson-remix";
import { getCategories } from "~/modules/categories/queries";

type LoaderData = {
  categories: Category[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const categories = await getCategories();

  return json({ categories });
};

export default function CampaignsIndexPage() {
  const { categories } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-8">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl">Kategorie</h2>

        <LinkButton
          as={Link}
          to="/categories/new"
          size="sm"
        >
          <FolderPlusIcon className="h-5 w-5" />
          <span>Dodaj</span>
        </LinkButton>
      </div>
      <div className="flex flex-col space-y-6">
        {categories.map((cat) => JSON.stringify(cat, null, 2))}
      </div>
    </div>
  );
}
