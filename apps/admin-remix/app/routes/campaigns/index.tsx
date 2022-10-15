// import { BreadcrumbLink } from "@chakra-ui/react";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { LinkButton } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { notFound } from "~/core/utils/http.server";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import {
  CampaignsTable,
  CampaignsTableBody,
} from "~/modules/campaign/components/campaigns-table";
import type { ICampaigns } from "~/modules/campaign/queries";
import {
  getCampaignsByUserId,
  getAllCampaigns,
} from "~/modules/campaign/queries";
import { isAdmin } from "~/modules/user/helpers";

// export const handle = {
//   breadcrumb: () => {
//     <NavLink to="/campaigns">Kampanie</NavLink>;
//   },
// };

type LoaderData = {
  campaigns: ICampaigns[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, user } = await requireAuthSession(request);

  let campaigns: ICampaigns[];
  if (isAdmin(user?.role)) {
    campaigns = await getAllCampaigns();
  } else {
    campaigns = await getCampaignsByUserId({ userId });
  }

  if (!campaigns) {
    throw notFound(`No campaigns for user with id ${userId}`);
  }

  return json({ campaigns });
};

export default function CampaignsIndexPage() {
  const data = useLoaderData<LoaderData>();
  // useWatchCampaigns();

  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-8">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl">Kampanie</h2>

        <LinkButton
          as={Link}
          to="/campaigns/new"
          size="sm"
        >
          <GlobeEuropeAfricaIcon className="h-5 w-5" />+<span>Dodaj</span>
        </LinkButton>
      </div>
      <div className="flex flex-col space-y-6">
        <CampaignsTable>
          <CampaignsTableBody campaigns={data.campaigns} />
        </CampaignsTable>
      </div>
    </div>
  );
}
