// import { BreadcrumbLink } from "@chakra-ui/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
// import { formatISO9075 } from "date-fns";
import invariant from "tiny-invariant";

import { requireAuthSession } from "~/core/auth/guards";
import { commitAuthSession } from "~/core/auth/session.server";
// import { db } from "~/core/database";
import { assertIsDelete } from "~/core/utils/http.server";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import { deleteCampaign } from "~/modules/campaign/mutations";
import { getUserCampaignById, UserCampaign } from "~/modules/campaign/queries";

type LoaderData = {
  campaign: UserCampaign;
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
  const { userId } = await requireAuthSession(request);
  invariant(params.campaignId, "campaignId not found");

  const campaign = await getUserCampaignById({ userId, id: params.campaignId });
  if (!campaign) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ campaign });
};

export const action: ActionFunction = async ({ request, params }) => {
  assertIsDelete(request);

  const authSession = await requireAuthSession(request);
  invariant(params.campaignId, "campaignId not found");

  await deleteCampaign({ userId: authSession.userId, id: params.campaignId });

  return redirect("/campaigns", {
    headers: {
      "Set-Cookie": await commitAuthSession(request, { authSession }),
    },
  });
};

function Categories({
  categories,
}: {
  categories: UserCampaign["categories"];
}) {
  if (categories.length < 1) return <>Brak kategorii</>;

  return (
    <>
      {categories.map((cat: any) => (
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
  const { campaign } = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex flex-col space-y-6 px-3 py-4 lg:space-y-12 lg:px-6 lg:py-8">
        <div className="flex flex-col justify-between space-y-6 lg:flex-row lg:space-y-0">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">{campaign.title}</h2>
            <div className="flex space-x-2">
              <Categories categories={campaign.categories} />
            </div>
          </div>
          <div className="flex items-center space-x-3 text-lg">
            <span>{new Date(campaign.startDate).toISOString()}</span>
            <span>-</span>
            {campaign.endDate && (
              <span>{new Date(campaign.endDate).toISOString()}</span>
            )}
            {!campaign.endDate && <span>Do odwołania</span>}
          </div>
        </div>
        <div className="flex w-full flex-col space-y-6 lg:mx-auto lg:w-3/5 lg:space-y-12">
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
