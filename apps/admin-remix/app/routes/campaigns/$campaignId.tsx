import { useState } from "react";

import { TrashIcon } from "@heroicons/react/24/outline";
import type { LoaderFunction } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { json, useLoaderData } from "~/utils/superjson-remix";
import { DeleteConfirmModal } from "~/modules/campaign/components/delete-confirm-modal";
import type { UserCampaign } from "~/modules/campaign/queries";
import { getCampaignById } from "~/modules/campaign/queries";
import { getUserDisplayName, isAdmin } from "~/modules/user/helpers";
import type { IUser } from "~/modules/user/queries";

type LoaderData = {
  campaign: UserCampaign;
  user: IUser | null;
};

// export const handle = {
//   breadcrumb: (id: string) => {
//     // const campaignName = (await db.campaign.findUnique({ where: { id } }))
//     //   ?.title;
//     return (
//       <NavLink to="/campaigns">
//         Kampanie{/* {campaignName ?? "Unknown"} */}
//       </NavLink>
//     );
//   },
// };

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.campaignId, "campaignId not found");

  const { user } = await requireAuthSession(request);
  const campaign = await getCampaignById({ user, id: params.campaignId });
  if (!campaign) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ campaign, user });
};

function Categories({
  categories,
}: {
  categories: UserCampaign["categories"];
}) {
  if (categories.length < 1) return <>Brak kategorii</>;

  return (
    <>
      {categories.map((cat) => (
        <span
          key={cat.id}
          className="rounded-full border border-stone-300 bg-stone-300 px-2 py-1 text-xs font-medium text-stone-800"
        >
          {cat.name}
        </span>
      ))}
    </>
  );
}

export default function Campaign() {
  const { campaign, user } = useLoaderData<LoaderData>();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  function showDialog() {
    setConfirmDialogOpen(true);
  }
  function dismissDialog() {
    setConfirmDialogOpen(false);
  }

  return (
    <>
      <DeleteConfirmModal
        campaignId={campaign.id}
        onDismiss={dismissDialog}
        isOpen={confirmDialogOpen}
      />
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          {isAdmin(user?.role) && (
            <span className="text-stone-700">
              {getUserDisplayName(campaign.user)}
            </span>
          )}
          <Button onClick={showDialog}>
            <TrashIcon className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex flex-col space-y-6 px-3 py-4 md:space-y-12 md:px-6 md:py-8">
          <div className="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold">{campaign.title}</h2>
              <div className="flex space-x-2">
                <Categories categories={campaign.categories} />
              </div>
            </div>
            <div className="flex items-center space-x-3 text-md">
              <span>{new Date(campaign.startDate).toISOString()}</span>
              <span>-</span>
              {campaign.endDate && (
                <span>{new Date(campaign.endDate).toISOString()}</span>
              )}
              {!campaign.endDate && <span>Do odwołania</span>}
            </div>
          </div>
          <div className="flex w-full flex-col space-y-6 md:mx-auto md:w-3/5 md:space-y-12">
            <div className="relative mx-auto h-60 w-[25rem] max-w-full overflow-hidden rounded-md bg-stone-300">
              <div className="absolute bottom-0 flex h-16 w-full items-center bg-black opacity-60">
                <span className="ml-auto flex items-end space-x-1 px-4 text-right text-3xl font-bold leading-none text-white">
                  <span>{campaign.price?.toString()}</span>
                  <span className="self-end text-xl">zł</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold opacity-60">Informacje</h3>
                <p>{campaign.body}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="divider divider-vertical" />
            <h3 className="text-xl font-semibold">Wygenerowane vouchery</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
