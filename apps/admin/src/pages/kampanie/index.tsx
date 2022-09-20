import { Heading, Stack, HStack } from '@chakra-ui/react';
import { GlobeIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { LinkButton } from 'ui';

import CampaignsTable from '~/components/campaigns/CampaignsTable';
import WithSidebar from '~/components/layouts/WithSidebar';

export default function Campaigns() {
  return (
    <WithSidebar title="Voucher Tatry - Kampanie">
      <Stack spacing={8}>
        <HStack justifyContent="space-between">
          <Heading fontSize="3xl">Kampanie</Heading>

          <Link href="/kampanie/nowa_kampania" passHref>
            <LinkButton size="sm">
              <GlobeIcon className="h-5 w-5" />+<span>Dodaj</span>
            </LinkButton>
          </Link>
        </HStack>
        <Stack spacing={6}>
          <CampaignsTable />
        </Stack>
      </Stack>
    </WithSidebar>
  );
}
