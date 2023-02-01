import React, { useState } from 'react';

import {
  Flex,
  Box,
  Stack,
  Link as ChakraLink,
  HStack,
  Heading,
  Icon,
} from '@chakra-ui/react';
import {
  FolderIcon,
  GlobeEuropeAfricaIcon as GlobeIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
  TagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, HamburgerMenuButton } from 'ui';

import Breadcrumbs from '~/components/Breadcrumbs';
import LogoHorizontal from '~/components/LogoHorizontal';

function SidebarMenuItem({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const router = useRouter();
  const homeMenuItem = pathname === '/';
  const isHome = router.pathname === '/';

  const activeHome = homeMenuItem && isHome;

  const match =
    activeHome || (!homeMenuItem && router.pathname.startsWith(pathname));

  return (
    <Flex as="li" flexDirection="column">
      <Box position="relative" px={6} py={1}>
        <Link href={pathname} passHref legacyBehavior={true}>
          <ChakraLink
            display="inline-flex"
            w="full"
            alignItems="center"
            px={3}
            py={2}
            fontSize="md"
            fontWeight="semibold"
            color="gray.100"
            transitionProperty="color"
            transitionDuration="150ms"
            textDecoration="none"
            opacity={!match ? '60%' : undefined}
            rounded="2xl"
            _hover={{ opacity: !match && '100' }}
            _active={{
              backgroundColor: !match
                ? 'var(--chakra-colors-primary-500)'
                : undefined,
            }}
            aria-current="page"
          >
            {match && (
              <Box
                as="span"
                backgroundColor="primary.500"
                position="absolute"
                insetY={0}
                left={0}
                w={2}
                roundedRight="md"
                aria-hidden="true"
              />
            )}
            {children}
          </ChakraLink>
        </Link>
      </Box>
    </Flex>
  );
}

const BrandButton: React.FC = () => (
  <Link href="/" passHref>
    <Flex
      as="a"
      alignItems="center"
      justifyContent="start"
      px={9}
      fontSize={{ base: 'lg', lg: '2xl' }}
      fontWeight="bold"
      color="gray.100"
    >
      <LogoHorizontal
        className="h-8"
        textClassName="text-white"
        mountainsClassName={{ body: 'text-stone-300', line: 'text-stone-400' }}
      />
    </Flex>
  </Link>
);

const SideMenu: React.FC = () => (
  <Box py={4} color="gray.100">
    <BrandButton />
    <Stack mt={12} spacing={8}>
      <Stack as="ul" spacing={0}>
        <SidebarMenuItem pathname="/">
          <HStack spacing={{ base: 2, lg: 4 }}>
            <Icon w={6} h={6} as={HomeIcon} />
            <span>Overview</span>
          </HStack>
        </SidebarMenuItem>
      </Stack>
      <Stack as="ul" spacing={0}>
        <Heading as="h4" fontSize="lg" color="gray.400" p={4}>
          Strefa użytkownika
        </Heading>
        <SidebarMenuItem pathname="/kampanie">
          <HStack spacing={{ base: 2, lg: 4 }}>
            <Icon w={6} h={6} as={TagIcon} />
            <span>Kampanie</span>
          </HStack>
        </SidebarMenuItem>
      </Stack>

      <Stack as="ul" spacing={0}>
        <Heading as="h4" fontSize="lg" color="gray.400" p={4}>
          Strefa administratora
        </Heading>
        <SidebarMenuItem pathname="/strona_internetowa">
          <HStack spacing={{ base: 2, lg: 4 }}>
            <Icon w={6} h={6} as={GlobeIcon} />
            <span>Strona internetowa</span>
          </HStack>
        </SidebarMenuItem>
        <SidebarMenuItem pathname="/kategorie">
          <HStack spacing={{ base: 2, lg: 4 }}>
            <Icon w={6} h={6} as={FolderIcon} />
            <span>Kategorie</span>
          </HStack>
        </SidebarMenuItem>
        <SidebarMenuItem pathname="/klienci">
          <HStack spacing={{ base: 2, lg: 4 }}>
            <Icon w={6} h={6} as={UsersIcon} />
            <span>Klienci</span>
          </HStack>
        </SidebarMenuItem>
      </Stack>
    </Stack>
  </Box>
);

function WithSidebar({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const supabaseClient = useSupabaseClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const isRootPage =
    router.pathname.split('/').filter((p) => p.length > 0).length < 2;

  async function signOut() {
    await supabaseClient.auth.signOut();
    router.push('/auth');
  }

  function toggleSidebar() {
    setSidebarOpen((v) => !v);
  }

  return (
    <Flex h="full">
      <Head>
        <title key="title">{title}</title>
      </Head>
      <Flex
        as="aside"
        position={{ base: 'fixed', lg: 'static' }}
        inset={0}
        transitionProperty={{ base: 'transform', lg: 'none' }}
        transitionDuration="300ms"
        transitionTimingFunction="ease-in-out"
        // translateX={{ base: sidebarOpen ? 0 : '-100%', lg: 0 }}
        zIndex={50}
        mt={{ base: 16, lg: 0 }}
        w={{ base: 64, xl: 64 }}
        flexShrink={0}
        bgColor="gray.800"
        color="gray.100"
        boxShadow="base"
        overflowY="auto"
        className={clsx(
          {
            '-translate-x-full': !sidebarOpen,
            'translate-x-0': sidebarOpen,
          },
          'lg:translate-x-0'
        )}
      >
        <SideMenu />
      </Flex>
      <Box
        transitionProperty="colors"
        transitionDuration="500ms"
        transitionTimingFunction="ease-in-out"
        translateX={!sidebarOpen ? '-100%' : undefined}
        opacity={!sidebarOpen ? '0%' : '50%'}
        position="fixed"
        inset={0}
        zIndex={40}
        alignItems="end"
        bgColor="gray.900"
        display={{ base: sidebarOpen ? 'block' : 'none', lg: 'none' }}
        onClick={toggleSidebar}
      ></Box>
      <Flex flexDir="column" flex="1 1 0%" w="full" overflow="hidden">
        <Flex
          as="header"
          w="full"
          alignItems="center"
          justifyContent="space-between"
          px={6}
          py={4}
          color={{ base: 'gray.100', lg: 'gray.900' }}
          zIndex={40}
          bgColor={{ base: 'gray.800', lg: 'transparent' }}
          boxShadow={{ base: 'md', lg: 'none' }}
        >
          <Flex alignItems="center" display={{ base: 'flex', lg: 'none' }}>
            <HamburgerMenuButton
              isToggled={sidebarOpen}
              onToggle={toggleSidebar}
            />
          </Flex>
          {!isRootPage && (
            <Box display={{ base: 'none', lg: 'block' }} color="gray.900">
              <Breadcrumbs />
            </Box>
          )}
          <HStack
            as="ul"
            flexShrink={0}
            alignItems="center"
            spacing={4}
            ml="auto"
          >
            <Flex as="li">
              <Button size="sm" onClick={signOut}>
                <Icon w={6} h={6} as={LogoutIcon} />
                <span>Wyloguj się</span>
              </Button>
            </Flex>
            {/* <li className="flex">
                <div className="text-stone-100 lg:text-stone-900 h-6 w-6">
                  <ThemeChanger />
                </div>
              </li> */}
          </HStack>
        </Flex>
        {!isRootPage && (
          <Box
            overflowX="auto"
            px={4}
            py={4}
            display={{ base: 'block', lg: 'none' }}
          >
            <Breadcrumbs />
          </Box>
        )}
        <Box
          as="main"
          position="relative"
          h="full"
          overflowY="auto"
          overflowX="hidden"
          py={8}
          px={{ base: 6, lg: 12 }}
          backgroundColor="gray.100"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export default WithSidebar;
