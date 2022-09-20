// import { BreadcrumbLink } from "@chakra-ui/react";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { LinkButton } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import {
  CampaignsTable,
  CampaignsTableBody,
} from "~/core/components/campaigns-table";
import { notFound } from "~/core/utils/http.server";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import type { ICampaigns } from "~/modules/campaign/queries";
import * as queries from "~/modules/campaign/queries";

// export const handle = {
//   breadcrumb: () => {
//     <NavLink to="/campaigns">Kampanie</NavLink>;
//   },
// };

type LoaderData = {
  email: string;
  campaigns: ICampaigns[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, email } = await requireAuthSession(request);

  const campaigns = await queries.getCampaignsByUserId({ userId });

  if (!campaigns) {
    throw notFound(`No user with id ${userId}`);
  }

  return json({ email, campaigns });
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
