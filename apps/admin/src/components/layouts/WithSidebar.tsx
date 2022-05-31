import React, { useState } from 'react';

import { GlobeIcon, HomeIcon, UsersIcon } from '@heroicons/react/outline';
import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Breadcrumbs from '~/components/Breadcrumbs';
import LogoHorizontal from '~/components/LogoHorizontal';
import { Button, HamburgerMenuButton } from 'ui';
// import ThemeChanger from '~/components/ThemeChanger';

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <label className="swapRotate swap pointer-events-none">
      <input type="checkbox" checked={open} readOnly />
      <svg
        className="swap-off h-6 w-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>

      <svg
        className="swap-on h-6 w-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
      </svg>
    </label>
  );
}

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
    <li className="flex flex-col">
      <div className="relative px-6 py-1">
        <Link href={pathname}>
          <a
            className={clsx(
              'inline-flex w-full items-center px-3 py-2 text-sm font-semibold text-stone-100 transition-colors duration-150 lg:text-base',
              {
                'focus:bg-primary-500 rounded-md opacity-60 hover:opacity-100':
                  !match,
              }
            )}
            aria-current="page"
          >
            {match && (
              <span
                className="bg-primary-500 absolute inset-y-0 left-0 w-2 rounded-tr-md rounded-br-md"
                aria-hidden="true"
              ></span>
            )}
            {children}
          </a>
        </Link>
      </div>
    </li>
  );
}

const BrandButton: React.FC = () => (
  <Link href="/">
    <a className="flex items-center justify-start space-x-4 px-9 text-lg font-bold text-stone-100 lg:text-2xl">
      <LogoHorizontal
        className="h-8"
        textClassName="text-white"
        mountainsClassName={{ body: 'text-gray-300', line: 'text-gray-400' }}
      />
    </a>
  </Link>
);

const SideMenu: React.FC = () => (
  <div className="py-4 text-stone-100">
    <BrandButton />
    <ul className="mt-6">
      <SidebarMenuItem pathname="/">
        <div className="flex space-x-2 lg:space-x-4">
          <HomeIcon className="h-4 w-4 lg:h-6 lg:w-6" />
          <span>Overview</span>
        </div>
      </SidebarMenuItem>
      <SidebarMenuItem pathname="/klienci">
        <div className="flex space-x-2 lg:space-x-4">
          <UsersIcon className="h-4 w-4 lg:h-6 lg:w-6" />
          <span>Klienci</span>
        </div>
      </SidebarMenuItem>
      <SidebarMenuItem pathname="/kampanie">
        <div className="flex space-x-2 lg:space-x-4">
          <GlobeIcon className="h-4 w-4 lg:h-6 lg:w-6" />
          <span>Kampanie</span>
        </div>
      </SidebarMenuItem>
    </ul>
  </div>
);

function WithSidebar({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
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
    <div className="flex h-full">
      <Head>
        <title key="title">{title}</title>
      </Head>
      <aside
        className={clsx(
          'fixed inset-y-0 lg:static lg:translate-x-0',
          'transition-transform duration-300 ease-in-out lg:transition-none',
          { '-translate-x-full': !sidebarOpen },
          'z-50 mt-14 w-64 flex-shrink-0 overflow-y-auto bg-stone-800 text-stone-100 shadow lg:mt-0 xl:w-80'
        )}
      >
        <SideMenu />
      </aside>
      <div
        onClick={toggleSidebar}
        className={clsx(
          'transition-opacity duration-300 ease-in-out',
          { '-translate-x-full opacity-0': !sidebarOpen },
          'fixed inset-0 z-40 items-end bg-stone-900 bg-opacity-50 lg:hidden'
        )}
      ></div>
      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <header className="z-40 bg-stone-800 py-4 text-stone-100 shadow-md lg:bg-transparent lg:shadow-none">
          <div className="mx-auto flex h-full items-center justify-between px-6 text-stone-100">
            <div className="flex space-x-4">
              <HamburgerMenuButton
                isToggled={sidebarOpen}
                onToggle={toggleSidebar}
                className="lg:hidden"
              />
              {!isRootPage && (
                <div className="hidden text-stone-900 lg:block">
                  <Breadcrumbs />
                </div>
              )}
            </div>
            <ul className="flex flex-shrink-0 items-center space-x-6">
              <li className="flex">
                <Button sm onClick={signOut}>
                  Wyloguj się
                </Button>
              </li>
              {/* <li className="flex">
                <div className="text-stone-100 lg:text-stone-900 h-6 w-6">
                  <ThemeChanger />
                </div>
              </li> */}
            </ul>
          </div>
        </header>
        <ToastProvider duration={5000}>
          {!isRootPage && (
            <div className="block overflow-x-auto px-4 pt-4 lg:hidden">
              <Breadcrumbs />
            </div>
          )}
          <main className="lg-py-0 relative h-full overflow-y-auto overflow-x-hidden py-8 px-6 lg:px-12">
            {children}
            <ToastViewport className="fixed bottom-0 right-0 select-none" />
          </main>
        </ToastProvider>
      </div>
    </div>
  );
}

export default WithSidebar;
