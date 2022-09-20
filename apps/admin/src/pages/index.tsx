import { Box, Icon, HStack, Stack, Heading } from '@chakra-ui/react';
import { UsersIcon } from '@heroicons/react/outline';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { LinkButton } from 'ui';

import WithSidebar from '~/components/layouts/WithSidebar';

export default function Homepage() {
  return (
    <WithSidebar title="Voucher Tatry - strona domowa">
      <HStack
        bg="white"
        boxShadow="base"
        borderRadius="2xl"
        py={6}
        px={{ base: 8, lg: 16 }}
      >
        <Box as="figure">
          <Icon as={UsersIcon} color="gray.900" w={20} h={20} />
        </Box>
        <Stack>
          <Heading fontSize="2xl">Klienci</Heading>
          <p>Klinkij aby przejść do listy klientów.</p>
          <Link href="/klienci" passHref>
            <LinkButton>Idź</LinkButton>
          </Link>
        </Stack>
      </HStack>
    </WithSidebar>
  );
}

// export const getServerSideProps = withPageAuth({
//   authRequired: true,
//   redirectTo: '/auth',
// }) as GetServerSideProps;
