import { useState } from "react";

import {
  FolderIcon as Folder,
  // GlobeEuropeAfricaIcon as Globe,
  HomeIcon as Home,
  TagIcon as Tag,
  UsersIcon as Users,
  UserIcon as User,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { HamburgerMenuButton } from "ui";

import { Breadcrumbs } from "~/core/components/breadcrumbs";
import { LogoHorizontal } from "~/core/components/logo";
import { LogoutButton } from "~/core/components/logout-button";
import { useAppData } from "~/core/hooks/use-app-data";

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
    <li className="flex flex-col relative">
      {match && (
        <span
          className="absolute inset-y-0 left-0 w-2 rounded-r-md bg-primary-500"
          aria-hidden="true"
        />
      )}
      <Link
        className={clsx(
          "inline-flex items-center space-x-2 md:space-x-4",
          "w-auto rounded-2xl mx-6 px-2 py-3",
          "text-lg font-semibold text-stone-100 no-underline",
          "transition-colors duration-150",
          {
            "opacity-60 hover:opacity-100 hover:bg-primary-500 hover:bg-opacity-75 active:bg-primary-500":
              !match,
          }
        )}
        to={pathname}
        aria-current="page"
      >
        {children}
      </Link>
    </li>
  );
}

const BrandButton: React.FC = () => (
  <Link
    className="flex items-center justify-start px-9 text-lg font-bold text-stone-100 md:text-2xl"
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
  const { isAdmin, userId } = useAppData();

  return (
    <div className="py-4 text-stone-100">
      <BrandButton />
      <div className="mt-12 flex flex-col space-y-6">
        <ul className="flex flex-col space-y-2">
          <SidebarMenuItem pathname="/">
            <Home className="h-6 w-6 shrink-0" />
            <span className="leading-none">Overview</span>
          </SidebarMenuItem>
        </ul>
        <ul className="flex flex-col space-y-2">
          <h4 className="p-4 text-lg text-stone-400">Strefa użytkownika</h4>
          <SidebarMenuItem pathname="/campaigns">
            <Tag className="h-6 w-6 shrink-0" />
            <span>Kampanie</span>
          </SidebarMenuItem>
          {!isAdmin && userId && (
            <SidebarMenuItem pathname={`/users/${userId}`}>
              <User className="h-6 w-6 shrink-0" />
              <span>Profil użytkownika</span>
            </SidebarMenuItem>
          )}
        </ul>

        {isAdmin && (
          <ul className="flex flex-col space-y-2">
            <h4 className="p-4 text-lg text-stone-400">
              Strefa administratora
            </h4>

            {/* <SidebarMenuItem pathname="/strona_internetowa">
                <Globe className="-6 h-6 shrink-0" />
                <span>Strona internetowa</span>
            </SidebarMenuItem> */}
            <SidebarMenuItem pathname="/categories">
              <Folder className="h-6 w-6 shrink-0" />
              <span>Kategorie</span>
            </SidebarMenuItem>
            <SidebarMenuItem pathname="/users">
              <Users className="h-6 w-6 shrink-0" />
              <span>Klienci</span>
            </SidebarMenuItem>
          </ul>
        )}
      </div>
    </div>
  );
};

export function WithSidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, isAdmin } = useAppData();

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
    <div className="flex flex-col h-full">
      {!user.profile && (
        <div className="flex flex-row space-x-4 items-center leading-none w-full font-bold bg-orange-300 p-8 ">
          <ExclamationCircleIcon className="w-8 h-8" />
          <span className="h-min">
            Aby móc korzystać z platformy, niezbędne jest uzupełnienie profilu
          </span>
        </div>
      )}
      <div className="flex h-full relative">
        <aside
          className={clsx(
            "absolute inset-0 z-50 mt-16 w-64 shrink-0 overflow-y-auto bg-stone-800 text-stone-100 shadow-md transition-transform duration-300 ease-in-out md:static md:mt-0 md:transition-none",
            {
              "-translate-x-full": !sidebarOpen,
              "translate-x-0": sidebarOpen,
            },
            "md:translate-x-0"
          )}
        >
          <SideMenu />
        </aside>
        <div
          className={clsx(
            "absolute inset-0 z-40 items-end bg-stone-900 transition-colors duration-500 ease-in-out",
            {
              "-translate-x-full opacity-0": !sidebarOpen,
              "block opacity-50 md:hidden": sidebarOpen,
            }
          )}
          onClick={toggleSidebar}
        ></div>
        <div className="flex w-full flex-1 flex-col overflow-hidden">
          <header className="h-16 z-40 flex w-full items-center justify-between bg-stone-800 px-6 py-4 text-stone-100 shadow-md md:bg-transparent md:text-stone-900 md:shadow-none space-x-4">
            <div className="flex items-center md:hidden">
              <HamburgerMenuButton
                isToggled={sidebarOpen}
                onToggle={toggleSidebar}
              />
            </div>
            {user && (
              <div className="flex space-x-4 items-center">
                <Link
                  className="leading-none"
                  to={`/users/${user.id}`}
                >
                  {user.profile?.companyName ?? user.email}
                </Link>
                {isAdmin && (
                  <span className="rounded-full border border-stone-300 bg-stone-300 px-2 py-0.5 text-xs font-medium text-stone-800">
                    Admin
                  </span>
                )}
              </div>
            )}
            {!isRootPage && (
              <div className="hidden text-stone-900 md:block">
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
                <div className="text-stone-100 md:text-stone-900 h-6 w-6">
                  <ThemeChanger />
                </div>
              </li> */}
            </ul>
          </header>
          {!isRootPage && (
            <div className="block overflow-x-auto md:hidden">
              <Breadcrumbs />
            </div>
          )}
          <main className="relative h-full overflow-y-auto overflow-x-hidden bg-stone-100 py-8 px-6 md:px-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
