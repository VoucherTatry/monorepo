import {
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';

import Table from '~/components/layouts/Table';
import WithSidebar from '~/components/layouts/WithSidebar';

export default function Website() {
  return (
    <WithSidebar title="Voucher Tatry - edycja strony internetowej">
      <Stack spacing={4}>
        <Heading as="h2" fontSize="3xl">
          Strona internetowa
        </Heading>

        <Heading as="h3" fontSize="xl">
          Podstrony:
        </Heading>
        <Table>
          <Thead bg="gray.300">
            <Tr>
              <Th>Nazwa podstrony</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody bgColor="gray.50">
            <LinkBox as={Tr}>
              <Td _hover={{ bg: 'var(--chakra-colors-primary-200)' }}>
                <Link href="/strona_internetowa" passHref>
                  <LinkOverlay>Strona główna</LinkOverlay>
                </Link>
              </Td>
            </LinkBox>
            <LinkBox as={Tr}>
              <Td>
                <Link href="/strona_internetowa" passHref>
                  <LinkOverlay>Regulamin</LinkOverlay>
                </Link>
              </Td>
              <Td></Td>
            </LinkBox>
          </Tbody>
        </Table>
      </Stack>
    </WithSidebar>
  );
}
