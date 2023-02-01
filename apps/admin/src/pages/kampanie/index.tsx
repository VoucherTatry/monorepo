import { Heading, Stack, HStack } from '@chakra-ui/react';
import { GlobeEuropeAfricaIcon as GlobeIcon } from '@heroicons/react/24/outline';
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

          <Link href="/kampanie/nowa_kampania" passHref legacyBehavior={true}>
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
