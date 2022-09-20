import { Heading, Stack, HStack } from '@chakra-ui/react';
import { UserAddIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Button } from 'ui';

import WithSidebar from '~/components/layouts/WithSidebar';
import MerchantsTable from '~/components/merchants/MerchantsTable';

export default function Merchants() {
  return (
    <WithSidebar title="Voucher Tatry - Klienci">
      <Stack spacing={8}>
        <HStack justifyContent="space-between">
          <Heading fontSize="3xl">Klienci</Heading>

          <Link href="/klienci/nowy_klient" passHref>
            <Button as="a" experimental_spaceX={1}>
              <UserAddIcon className="h-6 w-6" />
              <span>Dodaj</span>
            </Button>
          </Link>
        </HStack>
        <Stack spacing={6}>
          <MerchantsTable />
        </Stack>
      </Stack>
    </WithSidebar>
  );
}
