import { useState } from "react";

import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

import {
  FolderIcon as Folder,
  GlobeEuropeAfricaIcon as Globe,
  HomeIcon as Home,
  TagIcon as Tag,
  UsersIcon as Users,
} from "@heroicons/react/24/outline";
// import { Button, HamburgerMenuButton } from 'ui';

import { Breadcrumbs } from "~/core/components/breadcrumbs";
import { LogoHorizontal } from "~/core/components/logo";
import { LogoutButton } from "~/core/components/logout-button";
import { useStore } from "zustand";
import { useUserStore } from "~/modules/store";
import { Button } from "ui";
import { Role } from "@prisma/client";

function SidebarMenuItem({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const location = useLocation();
  const homeMenuItem = pathname === "/";
  const isHome = location.pathname === "/";

  const activeHome = homeMenuItem && isHome;

  const match =
    activeHome || (!homeMenuItem && location.pathname.startsWith(pathname));

  return (
    <li className="flex flex-col">
      <div className="relative px-6 py-1">
        <Link
          className={clsx(
            "inline-flex w-full items-center rounded-2xl px-3 py-2 text-lg font-semibold text-stone-100 no-underline transition-colors duration-150",
            {
              "opacity-60 hover:opacity-100 active:bg-primary-500": !match,
            }
          )}
          to={pathname}
          aria-current="page"
        >
          {match && (
            <span
              className="absolute inset-y-0 left-0 w-2 rounded-r-md bg-primary-500"
              aria-hidden="true"
            />
          )}
          {children}
        </Link>
      </div>
    </li>
  );
}

const BrandButton: React.FC = () => (
  <Link
    className="flex items-center justify-start px-9 text-lg font-bold text-stone-100 lg:text-2xl"
    to="/"
  >
    <LogoHorizontal
      className="h-8"
      textClassName="text-white"
      mountainsClassName={{ body: "text-stone-300", line: "text-stone-400" }}
    />
  </Link>
);

const SideMenu: React.FC = () => {
  const isAdmin = useUserStore((store) => store.isAdmin());

  return (
    <div className="py-4 text-stone-100">
      <BrandButton />
      <div className="mt-12 flex flex-col space-y-8">
        <ul className="flex flex-col">
          <SidebarMenuItem pathname="/">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Home className="h-6 w-6 shrink-0" />
              <span className="leading-none">Overview</span>
            </div>
          </SidebarMenuItem>
        </ul>
        <ul className="flex flex-col">
          <h4 className="p-4 text-lg text-stone-400">Strefa użytkownika</h4>
          <SidebarMenuItem pathname="/campaigns">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Tag className="h-6 w-6 shrink-0" />
              <span>Kampanie</span>
            </div>
          </SidebarMenuItem>
        </ul>

        {isAdmin && (
          <ul className="flex flex-col">
            <h4 className="p-4 text-lg text-stone-400">
              Strefa administratora
            </h4>

            <SidebarMenuItem pathname="/strona_internetowa">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Globe className="-6 h-6 shrink-0" />
                <span>Strona internetowa</span>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem pathname="/kategorie">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Folder className="h-6 w-6 shrink-0" />
                <span>Kategorie</span>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem pathname="/profile">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Users className="h-6 w-6 shrink-0" />
                <span>Klienci</span>
              </div>
            </SidebarMenuItem>
          </ul>
        )}
      </div>
    </div>
  );
};

export function WithSidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useUserStore((store) => store.user);

  const location = useLocation();
  const isRootPage =
    location.pathname.split("/").filter((p) => p.length > 0).length < 2;

  // async function signOut() {
  //   await supabaseClient.auth.signOut();
  //   router.push("/auth");
  // }

  function toggleSidebar() {
    setSidebarOpen((v) => !v);
  }

  return (
    <div className="flex h-full">
      <aside
        className={clsx(
          "fixed inset-0 z-50 mt-16 w-64 shrink-0 overflow-y-auto bg-stone-800 text-stone-100 shadow-md transition-transform duration-300 ease-in-out lg:static lg:mt-0 lg:transition-none",
          {
            "-translate-x-full": !sidebarOpen,
            "translate-x-0": sidebarOpen,
          },
          "lg:translate-x-0"
        )}
      >
        <SideMenu />
      </aside>
      <div
        className={clsx(
          "fixed inset-0 z-40 items-end bg-stone-900 transition-colors duration-500 ease-in-out",
          {
            "-translate-x-full opacity-0": !sidebarOpen,
            "block opacity-50 lg:hidden": sidebarOpen,
          }
        )}
        onClick={toggleSidebar}
      ></div>
      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <header className="z-40 flex w-full items-center justify-between bg-stone-800 px-6 py-4 text-stone-100 shadow-md lg:bg-transparent lg:text-stone-900 lg:shadow-none">
          <div className="flex items-center lg:hidden">
            <Button
              onClick={toggleSidebar}
              // isToggled={sidebarOpen}
              // onToggle={toggleSidebar}
            />
          </div>
          {user && (
            <Link to={`/profile/${user.id}`}>
              {user.profile?.companyName ?? user.email}
            </Link>
          )}
          {!isRootPage && (
            <div className="hidden text-stone-900 lg:block">
              <Breadcrumbs />
            </div>
          )}
          <ul className="ml-auto flex shrink-0 items-center space-x-4">
            <li className="flex">
              <LogoutButton />
              {/* <Button
                size="sm"
                onClick={signOut}
                leftIcon={
                  <Icon
                    w={6}
                    h={6}
                    as={LogoutIcon}
                  />
                }
              >
                Wyloguj się
              </Button> */}
            </li>
            {/* <li className="flex">
                <div className="text-stone-100 lg:text-stone-900 h-6 w-6">
                  <ThemeChanger />
                </div>
              </li> */}
          </ul>
        </header>
        {!isRootPage && (
          <div className="block overflow-x-auto lg:hidden">
            <Breadcrumbs />
          </div>
        )}
        <main className="relative h-full overflow-y-auto overflow-x-hidden bg-stone-100 py-8 px-6 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}
