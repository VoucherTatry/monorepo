import { Heading } from '@chakra-ui/react';
import { GlobeIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { Button } from 'ui';

import CampaignsTable from '~/components/campaigns/CampaignsTable';
import WithSidebar from '~/components/layouts/WithSidebar';

export default function Campaigns() {
  return (
    <WithSidebar title="Voucher Tatry - Kategorie">
      <div className="space-y-8">
        <div className="flex justify-between">
          <Heading fontSize="3xl">Kategorie</Heading>

          <Link href="/kategorie/nowa_kategoria" passHref>
            <Button as="a" size="sm" display="flex" experimental_spaceX={1}>
              <GlobeIcon className="h-5 w-5" />+<span>Dodaj</span>
            </Button>
          </Link>
        </div>
        <div className="space-y-6">
          <CampaignsTable />
        </div>
      </div>
    </WithSidebar>
  );
}
