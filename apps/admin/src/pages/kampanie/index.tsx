import { GlobeIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import CampaignsTable from '~/components/campaigns/CampaignsTable';
import WithSidebar from '~/components/layouts/WithSidebar';

export default function Campaigns() {
  return (
    <WithSidebar title="Voucher Tatry - Kampanie">
      <div className="space-y-8">
        <div className="flex justify-between">
          <h2 className="text-3xl">Kampanie</h2>

          <Link href="/kampanie/nowa_kampania">
            <a className="btn btn-primary btn-sm flex space-x-2">
              <GlobeIcon className="h-5 w-5" />+<span>Dodaj</span>
            </a>
          </Link>
        </div>
        <div className="space-y-6">
          <CampaignsTable />
        </div>
      </div>
    </WithSidebar>
  );
}
